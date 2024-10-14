'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      apartment: {
        type: Sequelize.BOOLEAN,
      },
      house: {
        type: Sequelize.BOOLEAN,
      },
      condo: {
        type: Sequelize.BOOLEAN,
      },
      nightPerson: {
        type: Sequelize.BOOLEAN,
      },
      morningPerson: {
        type: Sequelize.BOOLEAN,
      },
      extrovert: {
        type: Sequelize.BOOLEAN,
      },
      introvert: {
        type: Sequelize.BOOLEAN,
      },
      smoker: {
        type: Sequelize.BOOLEAN,
      },
      bringFriendsOver: {
        type: Sequelize.BOOLEAN,
      },
      loud: {
        type: Sequelize.BOOLEAN,
      },
      shareFood: {
        type: Sequelize.BOOLEAN,
      },
      pet: {
        type: Sequelize.BOOLEAN,
      },
      messy: {
        type: Sequelize.BOOLEAN,
      },
      clean: {
        type: Sequelize.BOOLEAN,
      },
      relationship: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Preferences');
  },
};
