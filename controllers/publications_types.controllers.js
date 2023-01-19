const PublicationsTypesService = require('../services/publications_types.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationsTypesService = new PublicationsTypesService()

const getPublicationsTypes = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publicationType = await publicationsTypesService.findAndCount(query)
    const results = getPagingData(publicationType, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const getPublicationTypeById = async(request, response, next) => {
  try {
    const id = request.params.publication_type_id
    let publicationType = await publicationsTypesService.getAllPublicationTypeById(id)
    return response.json({results: publicationType})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublicationsTypes, 
  getPublicationTypeById
}