const { Op } = require('sequelize')
const models = require('../database/models/index')

class PublicationsTypesServices {

  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    options.distinct = true

    const publication = await models.Publications_Types.findAndCountAll(options)
    return publication
  }

  async getAllPublicationTypeById(id) {
    let publication_type = await models.Publications_Types.findByPk(id, {raw: true})
    return publication_type
  }
}

module.exports = PublicationsTypesServices

