const express = require('express')
const postLogin = require('./auth.controllers')
const routes = express.Router()

routes.post('/', postLogin)

module.exports = routes