'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [{
      email: "root@gmail.com",
      senha: "$2b$10$DYRZPVWXS1nQjeo6qkkOYObHiWkCivdiM5dI.WMlTU3ujppbGCmtO",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Usuarios', {email: "root@gmail.com"}, {});
  }
};
