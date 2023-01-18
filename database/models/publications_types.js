'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications_Types.hasMany(models.Publications, { as: 'publications', foreignKey: 'publication_type_id' })
    }
  }
  Publications_Types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications_Types',
    tableName: 'publications_types',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'name', 'description']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publications_Types;
};