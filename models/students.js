'use strict';
module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define('students', {
    grade: DataTypes.INTEGER,
    memo: DataTypes.TEXT
  }, {});
  students.associate = function(models) {
    // associations can be defined here
    students.belongsTo(models.logins,{foreignKey:'username'})
    students.belongsTo(models.schools,{foreignKey:'school_id'})
    students.belongsTo(models.industries,{foreignKey:'industry_id1'})
    students.belongsTo(models.industries,{foreignKey:'industry_id2'})
    students.belongsTo(models.industries,{foreignKey:'industry_id3'})
  };
  return students;
};