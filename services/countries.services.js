const models = require('../database/models/index')

class CountriesServices {

  constructor() {
  }
  async getAllCountries() {
    let country = await models.Countries.findAll()
    return country
  }
}

module.exports = CountriesServices

