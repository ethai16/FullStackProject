'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    expire: DataTypes.DATE,
    data: DataTypes.STRING
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};