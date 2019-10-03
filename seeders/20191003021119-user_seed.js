'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'jori@gmail.com',
      password: 'password',
      apiKey: "bc15b840-e582-11e9-9610-5f33da77ab8b",
      createdAt: new Date(),
      updatedAt: new Date()
    }])}
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}
