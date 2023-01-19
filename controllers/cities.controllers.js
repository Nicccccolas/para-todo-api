const CitiesService = require('../services/cities.services')

const citiesService = new CitiesService()

const getAllCities = async (require, response, next) => {
  try {
    let cities = await citiesService.getAllCities()
    return response.json({ results: cities })
  } catch (error) {
    next(error)
  }
}

module.exports = {getAllCities}