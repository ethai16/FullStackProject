'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid:{type:DataTypes.STRING, primaryKey:true},
    expires: DataTypes.DATE,
    data: DataTypes.STRING
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};