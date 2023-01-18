'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      States.hasMany(models.Cities, { as: 'cities', foreignKey: 'state_id' })
      States.belongsTo(models.Countries, { as: 'countries', foreignKey: 'country_id' })
    }
  }
  States.init({
    country_id: DataTypes.BIGINT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'States',
    tableName: 'states',
    underscored: true,
    timestamps: true,

    scopes: {
      public_view: {
        attributes: ['id', 'name', 'country_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return States;
};