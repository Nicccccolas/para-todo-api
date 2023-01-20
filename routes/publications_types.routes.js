const express = require('express')
const router = express.Router()
const isAdmin = require('../middlewares/isAdmin.middleware')


const {
  getPublicationsTypes,
  getPublicationTypeById
} = require('../controllers/publications_types.controllers')


router.get('/', isAdmin, getPublicationsTypes)
router.get('/:publication_type_id', getPublicationTypeById)



module.exports = router