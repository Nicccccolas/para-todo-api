'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cities.belongsTo(models.State, { as: 'state', foreignKey: 'state_id' })
      Cities.hasMany(models.Publications, { as: 'publications', foreignKey: 'city_id' })
    }
  }
  Cities.init({
    state_id: DataTypes.BIGINT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'state_id', 'name']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Cities;
};