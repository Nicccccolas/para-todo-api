const express = require('express')
const routesUsers = require('./users.routes')
const routePublications = require('./publications.routes')
const routesLogin = require('../auth/auth.routes')
const isAdmin = require('../middlewares/isAdmin.middleware')
const getUsers = require('../services/users.services')
const passport = require('passport')
const { getInfoUser } = require('../controllers/users.controllers')
require('../libs/passport')(passport)



function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/sign-up', routesUsers)
  router.use('/login', routesLogin)
  router.get('/user-info', passport.authenticate('jwt', { session: false }), getInfoUser)
  router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, getUsers)
  router.use('/user', routesUsers)
  router.use('/countries', routerModels)
  router.use('/states', routerModels)
  router.use('/cities', routerModels)
  router.use('/roles', routerModels)
  router.use('/publications-types', routerModels)
  router.use('/publications', routerModels)
  // other models here
}

module.exports = routerModels