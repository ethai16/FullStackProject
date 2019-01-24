'use strict';
module.exports = (sequelize, DataTypes) => {
  const matching = sequelize.define('matching', {
    code: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    name: DataTypes.STRING
  }, {});
  matching.associate = function(models) {
    // associations can be defined here
    matching.belongsTo(models.users,{foreignKey:'teacher_username'})
    matching.belongsTo(models.users,{foreignKey:'mentor_username'})
    matching.belongsTo(models.users,{foreignKey:'student_username'})
    matching.belongsTo(models.industries,{foreignKey:'industry_id'})
  };
  return matching;
};