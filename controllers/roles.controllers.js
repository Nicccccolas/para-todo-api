const RolesService = require('../services/roles.services')

const rolesService = new RolesService()

// const getAllRoles = async (request, response) => {
//   await rolesService.getAllRoles()
//     .then(data => response.status(200).json({ results: data }))
//     .catch(err => response.status(400).json({ message: err.message }))
// }

const getAllRoles = async (request, response, next) => {
  try {
    let roles = await rolesService.getAllRoles()
    return response.json({ results: roles })
  } catch (error) {
    next(error)
  }
}

module.exports = {getAllRoles}