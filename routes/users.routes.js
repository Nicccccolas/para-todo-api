const express = require('express')
const router = express.Router()
const { postVote, removeVote } = require('../controllers/publications.controllers')
const passport = require('passport')
require('../libs/passport')(passport)


const {
  addUser,
  getUserById, 
  getInfoUser,
  updateUser,
  myPublications,
  myVotes,

} = require('../controllers/users.controllers')

router.post('/', addUser)
router.post('/', )


router.get('/', getInfoUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.post('/:id/vote', passport.authenticate('jwt', {session:false}), postVote)
router.delete('/:id/vote', passport.authenticate('jwt', {session:false}), removeVote)



module.exports = router