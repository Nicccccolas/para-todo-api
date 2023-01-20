const express = require('express')
const routesUsers = require('./users.routes')
const routePublications = require('./publications.routes')
const routePublicationsTypes = require('./publications_types.routes')
const routeCountries = require('./countries.routes')
const routeStates = require('./states.routes')
const routeCities = require('./cities.routes')
const routeRoles = require('./roles.routes')
const routesLogin = require('../auth/auth.routes')
const isAdmin = require('../middlewares/isAdmin.middleware')
const getUsers = require('../services/users.services')
const passport = require('passport')
const { addUser, getInfoUser } = require('../controllers/users.controllers')
require('../libs/passport')(passport)



function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.post('/sign-up', addUser)
  router.use('/login', routesLogin)

  router.get('/user-info', passport.authenticate('jwt', { session: false }), getInfoUser)
  router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, getUsers)
  router.use('/user',passport.authenticate('jwt', { session: false }), routesUsers)
  router.use('/countries', passport.authenticate('jwt', { session: false }), routeCountries)
  router.use('/states', passport.authenticate('jwt', { session: false }), routeStates)
  router.use('/cities', passport.authenticate('jwt', { session: false }), routeCities)
  router.use('/roles', passport.authenticate('jwt', { session: false }), isAdmin, routeRoles)
  router.use('/publications-types', passport.authenticate('jwt', { session: false }), routePublicationsTypes)
  router.use('/publications', passport.authenticate('jwt', { session: false }), routePublications)
}

module.exports = routerModels