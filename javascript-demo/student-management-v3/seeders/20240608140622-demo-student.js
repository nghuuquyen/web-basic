'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Students', [{
            studentId: 'S001',
            name: 'John Doe',
            dob: '2000-01-01',
            gender: 'Male',
            className: 'Class A',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Students', null, {});
    }
};
