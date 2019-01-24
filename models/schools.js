'use strict';
module.exports = (sequelize, DataTypes) => {
  const schools = sequelize.define('schools', {
    name: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  schools.associate = function(models) {
    // associations can be defined here
    schools.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'school_id'
    });
    schools.belongsTo(models.states,{foreignKey:'state_code'})

  };
  return schools;
};