'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    location: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    lng: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};