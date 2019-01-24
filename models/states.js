'use strict';
module.exports = (sequelize, DataTypes) => {
  const states = sequelize.define('states', {
    state: DataTypes.STRING
  }, {});
  states.associate = function(models) {
    // associations can be defined here
    states.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'state_code'
    });
    states.hasMany(models.companies,{
      onDelete:'CASCADE',
      foreignKey:'state_code'
    });
    states.hasMany(models.schools,{
      onDelete:'CASCADE',
      foreignKey:'state_code'
    });
  };
  return states;
};