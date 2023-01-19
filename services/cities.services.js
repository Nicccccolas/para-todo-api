const models = require('../database/models/cities')

class CitiesServices {

  constructor() {
  }
  async getAllCities() {
    let city = await models.Cities.findAll()
    return city
  }
}

module.exports = CitiesServices

