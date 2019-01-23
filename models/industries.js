'use strict';
module.exports = (sequelize, DataTypes) => {
  const industries = sequelize.define('industries', {
    industries: DataTypes.STRING
  }, {});
  industries.associate = function(models) {
    // associations can be defined here
    industries.hasMany(models.students,{
      onDelete:'CASCADE',
      foreignKey:'industry_id1'
    });
    industries.hasMany(models.students,{
      onDelete:'CASCADE',
      foreignKey:'industry_id2'
    });
    industries.hasMany(models.students,{
      onDelete:'CASCADE',
      foreignKey:'industry_id3'
    });  
    industries.hasMany(models.mentors,{
      onDelete:'CASCADE',
      foreignKey:'industry_id'
    });
  };
  return industries;
};