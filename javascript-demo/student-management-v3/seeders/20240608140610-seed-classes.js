'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Classes', [
            {name: 'Class A', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Class B', createdAt: new Date(), updatedAt: new Date()},
            {name: 'Class C', createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Classes', null, {});
    }
};
