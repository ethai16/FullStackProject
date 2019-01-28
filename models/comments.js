'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    comment: DataTypes.STRING
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
    comments.belongsTo(models.users,{foreignKey:'username'});

  };
  return comments;
};