const express = require('express')
const router = express.Router()
const isAdmin = require('../middlewares/isAdmin.middleware')
const hasUserVoted = require('../middlewares/hasUserVoted.middleware')


const { 
  getPublications,
  postPublication,
  getPublicationById,
  postVote, 
  getVotesByPublication,
  removeVote,
  deletePublication,
} = require('../controllers/publications.controllers')


router.post('/', postPublication)
router.get('/', getPublications)

router.get('/:publication_id', getPublicationById)
router.delete('/:publication_id', deletePublication)
router.post('/:publication_id/vote', hasUserVoted, postVote)
router.delete('/:publication_id/vote', removeVote)
router.get('/:publication_id/vote', getVotesByPublication)


module.exports = router