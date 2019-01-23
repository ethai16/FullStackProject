'use strict';
module.exports = (sequelize, DataTypes) => {
  const matching = sequelize.define('matching', {
    code: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  matching.associate = function(models) {
    // associations can be defined here
    matching.belongsTo(models.logins,{foreignKey:'teacher_username'})
    matching.belongsTo(models.logins,{foreignKey:'student_username'})
    matching.belongsTo(models.logins,{foreignKey:'mentor_username'})
  };
  return matching;
};