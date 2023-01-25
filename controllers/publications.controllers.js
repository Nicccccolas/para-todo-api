const PublicationsService = require('../services/publications.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationsService = new PublicationsService()

const getPublications = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publication = await publicationsService.findAndCount(query)
    const results = getPagingData(publication, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const postPublication = async (request, response) => {
  let profile_id = request.user.id
  let { publication_type_id, title, description, content, picture, city_id, image_url } = request.body
  if (profile_id && publication_type_id && title && description && content && picture && city_id, image_url) {
    await publicationsService.createPublication(profile_id, { publication_type_id, title, description, content, picture, city_id, image_url })
      .then(data => response.status(201).json(data))
      .catch(err => response.status(400).json({ message: err.message }))
  }
  else {
    response.status(400).json({
      message: 'All fields are required', fields: {
        publication_type_id: 'INTEGER',
        title: 'STRING',
        description: 'STRING',
        content: 'STRING',
        picture: 'STRING',
        city_id: 'INTEGER',
        image_url: 'STRING'
      }
    })
  }
}
const getPublicationById = async (request, response, next) => {
  try {
    let publicationId = request.params.publication_id
    let publication = await publicationsService.getPublicationOr404(publicationId)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const postVote = async (request, response, next) => {
  let publicationId = request.params.publication_id
  let profileId = request.user.id

  try {
    const newVote = await publicationsService.postVotesByPublication(publicationId, profileId)
    return response.json({ result: newVote })
  } catch (error) {
    next(error)
  }
}

const getVotesByPublication = async (request, response, next) => {
  try {
    let publicationId = request.params.publication_id
    let publication = await publicationsService.getVotesByPublicationId(publicationId)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const removeVote = async (request, response, next) => {
  let publicationId = request.params.publication_id
  let profileId = request.user.id
  try {
    const deleteVote = await publicationsService.removeVotesByPublication(publicationId, profileId)
    return response.json({ results: deleteVote })
  } catch (error) {
    next(error)
  }
}
const deletePublication = async (request, response, next) => {
  try {
    let publicacionId = request.params.publication_id
    const publication = await publicationsService.removePublication(publicacionId)
    return response.json({ results: publication, message: 'Publications deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublications,
  postPublication,
  getPublicationById,
  postVote,
  getVotesByPublication,
  removeVote,
  deletePublication
}