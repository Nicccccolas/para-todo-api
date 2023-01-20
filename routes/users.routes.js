const express = require('express')
const router = express.Router()


const {
  getUserById,
  updateUser,
  myPublications,
  myVotes,

} = require('../controllers/users.controllers')

router.get('/:user_id', getUserById)
router.put('/:user_id', updateUser)
router.get('/:user_id/votes', myVotes) //!
router.get('/:user_id/publications', myPublications) //!


module.exports = router