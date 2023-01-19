const UsersService = require('../services/users.services')
const { comparePassword } = require('../utils/crypto')

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

module.exports = verifyUser