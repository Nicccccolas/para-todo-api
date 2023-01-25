'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.belongsTo(models.Roles, { as: 'Roles', foreignKey: 'role_id' })
      Profiles.belongsTo(models.Users, { as: 'Users', foreignKey: 'user_id' })
      Profiles.belongsTo(models.Countries, { as: 'Countries', foreignKey: 'country_id' })
      Profiles.hasMany(models.Publications, { as: 'Publications', foreignKey: 'profile_id' })
      Profiles.hasMany(models.Votes, { as: 'Votes', foreignKey: 'profile_id' })

    }
  }
  Profiles.init({
    user_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    code_phone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};