'use strict';
module.exports = (sequelize, DataTypes) => {
  const teachers = sequelize.define('teachers', {
    memo: DataTypes.TEXT
  }, {});
  teachers.associate = function(models) {
    // associations can be defined here
    teachers.belongsTo(models.logins,{foreignKey:'username'})
    teachers.belongsTo(models.schools,{foreignKey:'school_id'})
  };
  return teachers;
};