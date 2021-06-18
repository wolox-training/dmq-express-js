'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user_levels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING
      },
      min: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      max: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }),
  down: queryInterface => queryInterface.dropTable('user_levels')
};
