'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Remove old column className
        await queryInterface.removeColumn('students', 'className');

        // Add new column classId
        await queryInterface.addColumn('students', 'classId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Classes',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
    },

    async down(queryInterface, Sequelize) {
        // Add column className back
        await queryInterface.addColumn('students', 'className', {
            type: Sequelize.STRING,
            allowNull: true
        });

        // Remove new added column classId
        await queryInterface.removeColumn('students', 'classId');
    }
};
