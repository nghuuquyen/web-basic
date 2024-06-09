'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const students = [
            {
                studentId: '1000001',
                name: 'Student 1',
                dob: '2000-01-01',
                gender: 'Male',
                classId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                studentId: '1000002',
                name: 'Student 2',
                dob: '2000-05-02',
                gender: 'Male',
                classId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                studentId: '1000003',
                name: 'Student 3',
                dob: '2000-06-03',
                gender: 'Female',
                classId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        return queryInterface.bulkInsert('students', students, {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('students', null, {});
    },
};
