const RolesService = require('../services/roles.services')

const rolesService = new RolesService()

const getAllStates = async (request, response, next) => {
  try {
    let states = await rolesService.getAllStates()
    return response.json({ results: states })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllStates
}