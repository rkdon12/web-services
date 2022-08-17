const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false},
    last_updated: { type: DataTypes.DATE, allowNull: false}
  };

  const options = {
    defaultScope: {
      //exclude password hash by default
      attributes: {exclude: ['passwordHash']}
    },
    scopes: {
      ///include hash with this scope
      withHash: {attributes: {}, }
    }
  };

  return sequelize.define('User', attributes, options);

}
module.exports = model;
