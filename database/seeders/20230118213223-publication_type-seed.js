'use strict'
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('publications_types', [
        {
          id: 1,
          name: 'Events',
          description: 'Events organization',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'Concerts',
          description: 'Concerts organization',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          name: 'Tournament',
          description: 'Tournament organization',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('states', {
        name: {
          [Op.or]: ['Event', 'Concert', 'Tournament']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}