// const JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt
// const passport = require('passport')
// const UsersService = require('../services/users.services')
// require('dotenv').config()

// const options = {}

// options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
// options.secretOrKey = process.env.JWT_SECRET

// module.exports = passport.use(new JwtStrategy(options, function (jwtPayload, done) {
//   UsersService.getUser({id: jwtPayload.sub}, function(err, user){
//     if (err) {
//       return done(err, false)
//     }
//     if (user) {
//       return done(null, user)
//     } else {
//       return done(null, false)
//     }
//   })
// }))

const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const UsersService = require('../services/users.services')
require('dotenv').config()


const userServices = new UsersService()
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET
}
module.exports = (passport) => passport.use(
  new JwtStrategy(options, (tokenDecoded, done) => {
    userServices.getUserByIdOr404(tokenDecoded.id)
      .then((user) => {
        if (user) {
          done(null, tokenDecoded)
        } else {
          done(null, false)
        }
      })
      .catch((err) => {
        done(err, false)
      })
  })
)


