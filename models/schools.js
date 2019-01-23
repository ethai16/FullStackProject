'use strict';
module.exports = (sequelize, DataTypes) => {
  const schools = sequelize.define('schools', {
    name: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  schools.associate = function(models) {
    // associations can be defined here
    schools.hasMany(models.students,{
      onDelete:'CASCADE',
      foreignKey:'school_id'
    });
    schools.hasMany(models.teachers,{
      onDelete:'CASCADE',
      foreignKey:'school_id'
    });
  };
  return schools;
};