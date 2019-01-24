'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define('companies', {
    name: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {});
  companies.associate = function(models) {
    // associations can be defined here
    companies.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'company_id'
    }); 
    companies.belongsTo(models.states,{foreignKey:'state_code'}) 
  };
  return companies;
};