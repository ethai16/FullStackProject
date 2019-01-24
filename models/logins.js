'use strict';
module.exports = (sequelize, DataTypes) => {
  const logins = sequelize.define('logins', {
    username: {type:DataTypes.STRING,primaryKey:true},
    id:{type:DataTypes.INTEGER,unique:true, autoIncrement: true},
    password_salt: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {});
  logins.associate = function(models) {
    // associations can be defined here
    logins.hasMany(models.users,{
      onDelete:'CASCADE',
      foreignKey:'username'
    });
    logins.hasMany(models.teachers,{
      onDelete:'CASCADE',
      foreignKey:'username'
    });
    logins.hasMany(models.mentors,{
      onDelete:'CASCADE',
      foreignKey:'username'
    });
    logins.hasMany(models.students,{
      onDelete:'CASCADE',
      foreignKey:'username'
    });
    logins.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'teacher_username'
    });
    logins.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'student_username'
    });
    logins.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'mentor_username'
    });
  };
  return logins;
};