const models = require('../database/models/index')

class StatesServices {

  constructor() {
  }
  async getAllStates() {
    let state = await models.States.findAll()
    return state
  }
}

module.exports = StatesServices

