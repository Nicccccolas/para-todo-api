const models = require('../database/models/index')

class CitiesServices {

  constructor() {
  }
  async getAllCities() {
    let city = await models.Cities.findAll()
    return city
  }
}

module.exports = CitiesServices

