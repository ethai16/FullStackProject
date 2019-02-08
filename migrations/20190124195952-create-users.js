'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      role_id:{
        type:Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password_salt: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.CHAR
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      grade: {
        type: Sequelize.STRING
      },
      teacher_code: {
        type: Sequelize.STRING
      },
      mentor_code: {
        type: Sequelize.STRING
      },
      school_id:{
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_telephone: {
        type: Sequelize.STRING
      },
      company_street: {
        type: Sequelize.STRING
      },
      company_zipcode: {
        type: Sequelize.STRING
      },
      company_city: {
        type: Sequelize.STRING
      },
      company_state_code: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      industry_id1:{
        type: Sequelize.INTEGER
      },
      industry_id2:{
        type: Sequelize.INTEGER
      },
      industry_id3:{
        type: Sequelize.INTEGER
      },
      backgroundcheck: {
        type: Sequelize.BOOLEAN
      },
      state_code:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};