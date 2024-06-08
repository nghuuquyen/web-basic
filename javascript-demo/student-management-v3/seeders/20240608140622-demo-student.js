'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const students = [
            {
                studentId: '1000001',
                name: 'Student 1',
                dob: '2000-01-01',
                gender: 'Male',
                className: 'Class A',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                studentId: '1000002',
                name: 'Student 2',
                dob: '2000-05-02',
                gender: 'Male',
                className: 'Class B',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                studentId: '1000003',
                name: 'Student 3',
                dob: '2000-06-03',
                gender: 'Female',
                className: 'Class C',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ];

        return queryInterface.bulkInsert('students', students, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('students', null, {});
    }
};
