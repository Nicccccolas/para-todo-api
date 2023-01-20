const StatesService = require('../services/states.services')

const statesService = new StatesService()

const getAllStates = async (request, response, next) => {
  try {
    let states = await statesService.getAllStates()
    return response.json({ results: states })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllStates
}