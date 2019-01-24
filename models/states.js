'use strict';
module.exports = (sequelize, DataTypes) => {
  const states = sequelize.define('states', {
    state: {type:DataTypes.STRING,primaryKey:true},
    name: DataTypes.TEXT
  }, {});
  states.associate = function(models) {
    // associations can be defined here
    states.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'state_code'
    });
  };
  return states;
};