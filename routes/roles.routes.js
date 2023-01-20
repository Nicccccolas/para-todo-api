const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../libs/passport')(passport)

const { getAllRoles } = require('../controllers/roles.controllers')

router.get('/', passport.authenticate('jwt', {session: false}), getAllRoles)

module.exports = router