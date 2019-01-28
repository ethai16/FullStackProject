'use strict';
module.exports = (sequelize, DataTypes) => {
  const industries = sequelize.define('industries', {
    industries: DataTypes.STRING
  }, {});
  industries.associate = function(models) {
    // associations can be defined here
    industries.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'industry_id1'
    });
    industries.hasMany(models.users,{
      // as:'ind2',
      onDelete:'CASCADE',
      foreignKey:'industry_id2'
    });
    industries.hasMany(models.users,{
      // as:'ind3',
      onDelete:'CASCADE',
      foreignKey:'industry_id3'
    });  
    industries.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'industry_id'
    });  
  };
  return industries;
};