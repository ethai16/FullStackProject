'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
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
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_phone: {
        type: Sequelize.STRING
      },
      company_street: {
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
      backgroundcheck: {
        type: Sequelize.BOOLEAN
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