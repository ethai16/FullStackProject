'use strict';
module.exports = (sequelize, DataTypes) => {
  const states = sequelize.define('states', {
    state: {type:DataTypes.STRING,unique:true, primaryKey:true},
    name: DataTypes.STRING
  }, {});
  states.associate = function(models) {
    // associations can be defined here
    states.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'state_code'
    });
    states.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'company_state_code'
    });
    states.hasMany(models.schools,{
      as:'company_state',
      onDelete:'CASCADE',
      foreignKey:'state_code'
    });
  };
  return states;
};