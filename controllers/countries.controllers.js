const CountriesService = require('../services/countries.services')

const countriesService = new CountriesService() 

const getAllCountries = async (request, response, next) => {
  try {
    let countries = await countriesService.getAllCountries()
    return response.json({ results: countries })
  } catch (error) {
    next(error)
  }
}

module.exports= {
  getAllCountries
}