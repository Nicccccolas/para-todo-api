const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../libs/passport')(passport)

const { getAllStates } = require('../controllers/states.controllers')

router.get('/', passport.authenticate('jwt', {session: false}), getAllStates)


module.exports = router