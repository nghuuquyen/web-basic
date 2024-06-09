'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'Classes',
            [
                {
                    name: 'Class A',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Class B',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Class C',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
