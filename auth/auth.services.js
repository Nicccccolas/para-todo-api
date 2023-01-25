const uuid = require('uuid')
const UsersService = require('../services/users.services')
const { comparePassword } = require('../utils/crypto')
const models = require('../database/models')
const { hash } = require('bcrypt')

const usersService = new UsersService()

const verifyUser = async (email, password) => {
  try {
    const user = await usersService.getUserByEmail(email)
    const compare = comparePassword(password, user.password)
    if (compare) {
      return user
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const createRecoveryToken = async (email) => {
  try {
    const user = await usersService.getUserByEmail(email)
    const data = await models.Recovery_Password.create({
      id: uuid.v4(),
      userId: user.id
    })
    return data
  } catch (error) {
    return null
  }
}

const changePassword = async (tokenId, newPassword) => {

  try {
    let recoveryData = await models.Recovery_Password.findOne({ 
      where: {
        id: tokenId,
        used: false
      }})
    if (recoveryData) {
      await models.Recovery_Password.update({used: true}, {
        where: {
          id: tokenId
        }
      })
      const user = await usersService.updatePasswordUser(recoveryData.userId, {
        password: hash(newPassword)
      })
      return user
    }
  } catch (error) {
    return error
  }
}

//   const recoveryData = await models.Recovery_Password.findOne({
//     where: {
//       id: tokenId,
//       used: false
//     }
//   })
//   if (recoveryData) {
//     await models.Recovery_Password.update({ used: true }, {
//       where: {
//         id: tokenId
//       }
//     })
//     const data = await usersService.updateUser(recoveryData.userId, {
//       password: hash(newPassword)
//     })
//     return data
//   } else {
//     return null
//   }
// }

module.exports = {
  verifyUser,
  createRecoveryToken,
  changePassword
}