'use strict';
module.exports = (sequelize, DataTypes) => {
  const mentors = sequelize.define('mentors', {
    company_name: DataTypes.STRING,
    company_phone: DataTypes.STRING,
    title: DataTypes.STRING,
    backgroundcheck: DataTypes.BOOLEAN,
    memo: DataTypes.TEXT
  }, {});
  mentors.associate = function(models) {
    // associations can be defined here
  mentors.belongsTo(models.logins,{foreignKey:'username'})
  mentors.belongsTo(models.industries,{foreignKey:'industry_id'})
  };
  return mentors;
};