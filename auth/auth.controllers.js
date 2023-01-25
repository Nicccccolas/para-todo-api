const jwt = require('jsonwebtoken')

const authServices = require('./auth.services')
const jwtSecret = require('../config').api.jwtSecret
const mailer = require('../utils/mailer')
const config = require('../config')
const { request, response } = require('express')
require('dotenv')


const postLogin = (request, response) => {

  const { email, password } = request.body
  if (email && password) {
    authServices.verifyUser(email, password)
      .then(data => {
        if (data) {
          const token = jwt.sign({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          }, jwtSecret)
          response.status(200).json({ message: 'Correct Credentials', token })
        }
        else {
          response.status(400).json({ message: 'Invalid Credentials' })
        }
      })
      .catch(err => response.status(404).json({ message: err }))
  }
  else {
    response.status(400).json({
      message: 'All parametres are required', fields: {
        email: 'ecample@example.com',
        password: 'string'
      }
    })
  }
}


const postRecoveryToken = (request, response) => {
  const { email } = request.body
  if (email) {
    authServices.createRecoveryToken(email)
      .then((data) => {
        if (data) {
          mailer.sendMail({
            from: '<nicolaspantojadi@gmail.com>',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>${config.api.host}/api/v1/auth/recovery-password/${data.id}</a>`
          })
        }
        request.status(200).json({ message: 'Email sended!, Check your inbox' })
      })
      .catch((err) => {
        response.status(400).json({ message: err.message })
      })
  } else {
    response.status(400).json({ message: 'Invalid Data', fields: { email: 'example@example.com' } })
  }
}

const patchPassword = async (request, response) => {

  const id = request.params.user_id //? Is the id from register of recoveryPassword
  const { password } = request.body

  if (password) {
    await authServices.changePassword(id, { password })
      .then(data => {
        if (data) {
          response.status(200).json({ message: 'Password updated succesfully!' })
        } else {
          response.status(400).json({ message: 'URL expired' })
        }
      })
      .catch(err => {
        response.status(400).json({ message: err.message })
      })
  } else {
    await authServices.changePassword(id, { password })
      .then(data => response.status(200).json(data))
      .catch(err => response.status(400).json({
        message: err.message, fields: {
          password: 'STRING'
        }
      }))
  }
}

module.exports = {
  postLogin,
  postRecoveryToken,
  patchPassword
}