'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        static associate(models) {
            Class.hasMany(models.Student, {foreignKey: 'classId', as: 'students'}); // One class has many students
        }
    }

    Class.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Class',
    });
    
    return Class;
};