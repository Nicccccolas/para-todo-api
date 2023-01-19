'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {

      await queryInterface.createTable('profiles', {
        id: {
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          type: Sequelize.UUID
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        role_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'roles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          defaultValue: 1
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        code_phone: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        phone: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: true
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'countries',
            key: 'id'
          },
          defaultValue: 1,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('profiles', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}