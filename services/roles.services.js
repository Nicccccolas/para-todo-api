
const models = require('../database/models/index')

class RolesServices {

  constructor() {
  }
  async getAllRoles() {
    let role = await models.Roles.findAll()
    return role
  }
}

module.exports = RolesServices

