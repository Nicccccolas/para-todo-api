const PublicationsService = require('../services/publications.services')

const publicationService = new PublicationsService()

const hasUserVoted = async (request, response, next) => {
  const id = request.user.id
  const publicationId = request.params.publication_id
  publicationService.findByPublicationAndProfile(id, publicationId)
    .then(data => {
      if (data) {
        response.status(400).json({ message: 'The users has already voted for this publication ' })
      }
      else {
        next()
      }
    })
    .catch(err => response.status(400).json({ message: err.message })
    )
}
module.exports = hasUserVoted