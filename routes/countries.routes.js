const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../libs/passport')(passport)

const { getAllCountries } = require('../controllers/countries.controllers')

router.get('/', getAllCountries)


module.exports = router