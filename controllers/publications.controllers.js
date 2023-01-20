const { response } = require('express')
const { request } = require('http')
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

const postPublication = async (request, response, next) => {
  let profileId = request.user.id
  let { publication_type_id, title, description, content, picture, city_id, image_url } = request.body
  {
    try {
      const newPublication = await publicationsService.createPublication(profileId, { publication_type_id, title, description, content, picture, city_id, image_url })
      return response.json({ results: newPublication })
    } catch (error) {
      next(error, {
        fields: {
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