'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recovery_Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recovery_Password.belongsTo(models.Users, {as: 'users', foreignKey: 'userId'})
    }
  }
  Recovery_Password.init({
    userId: {
      type: DataTypes.UUID, 
      allowNull: false,
      foreignKey: true, 
      references: {
        model: 'users',
        key: 'id'
      }
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Recovery_Password',
    tableName: 'recovery_password',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['used']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Recovery_Password;
};