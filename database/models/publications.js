'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications.belongsTo(models.Cities, { as: 'cities', foreignKey: 'city_id' })
      Publications.belongsTo(models.Profiles, { as: 'profiles', foreignKey: 'profile_id' })
      Publications.belongsTo(models.Publications_Types, { as: 'publications_types', foreignKey: 'publication_type_id' })
      Publications.belongsTo(models.Votes, { as: 'votes', foreignKey: 'profile_id' })
    }
  }
  Publications.init({
    profile_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Profiles',
        key: 'id'
      },
    },
    publication_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'profile_id', 'publication_type_id', 'title', 'description', 'content', 'picture', 'city_id', 'image_url']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publications;
};