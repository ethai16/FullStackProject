'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {type:DataTypes.STRING,primaryKey:true},
    id:{type:DataTypes.INTEGER,unique:true, autoIncrement: true},
    password_salt: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    grade: DataTypes.STRING,
    position: DataTypes.STRING,
    backgroundcheck: DataTypes.BOOLEAN,
    company_name: DataTypes.STRING,
    company_zipcode: DataTypes.STRING,
    company_street: DataTypes.STRING,
    company_city: DataTypes.STRING,
    company_telephone: DataTypes.STRING,
    code: {type:DataTypes.STRING,unique:true}
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'teacher_username'
    });
    users.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'student_username'
    });
    users.hasMany(models.matching,{
      onDelete:'CASCADE',
      foreignKey:'mentor_username'
    });
    users.belongsTo(models.schools,{foreignKey:'school_id'})
    users.belongsTo(models.roles,{foreignKey:'role_id'})
    users.belongsTo(models.states,{foreignKey:'state_code'})
    users.belongsTo(models.states,{as: 'company_state', foreignKey:'company_state_code'})
    users.belongsTo(models.industries,{foreignKey:'industry_id1'})
    users.belongsTo(models.industries,{foreignKey:'industry_id2'})
    users.belongsTo(models.industries,{foreignKey:'industry_id3'})
    // users.belongsTo(models.matching,{foreignKey:'matching_id1'})
    // users.belongsTo(models.matching,{foreignKey:'matching_id2'})
    // users.belongsTo(models.matching,{foreignKey:'matching_id3'})
  };
  return users;
};