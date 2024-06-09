'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.belongsTo(models.Class, {
                foreignKey: 'classId',
                as: 'class',
            });
        }
    }

    Student.init(
        {
            studentId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            classId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Classes', // 'Classes' is the table name
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            name: DataTypes.STRING,
            dob: DataTypes.DATEONLY,
            gender: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Student',
            tableName: 'students',
        },
    );

    return Student;
};
