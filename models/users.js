'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    gender: DataTypes.CHAR,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state_code: DataTypes.CHAR,
    bio: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role_id: DataTypes.SMALLINT
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.belongsTo(models.logins,{foreignKey:'username'})
    users.belongsTo(models.roles,{foreignKey:'role_id'})
    users.belongsTo(models.states,{foreignKey:'state_code'})
  };
  return users;
};