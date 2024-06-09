'use strict';

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize, Student, Class } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
    session({
        secret: 'secret',
        store: new SequelizeStore({ db: sequelize }),
        resave: false,
        saveUninitialized: false,
    }),
);

app.get('/', async (req, res) => {
    const students = await Student.findAll({
        include: {
            model: Class,
            as: 'class',
            attributes: ['id', 'name'], // Include only the 'name' attribute of the 'Class' model
        },
    });
    const classes = await Class.findAll();

    res.render('index', { students, classes });
});

app.post('/add-student', async (req, res) => {
    const { studentId, name, dob, gender, classId } = req.body;
    await Student.create({ studentId, name, dob, gender, classId });
    res.redirect('/');
});

app.get('/api/student/:studentId', async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                studentId: req.params.studentId,
            },
            include: {
                model: Class,
                as: 'class',
                attributes: ['id', 'name'], // Include only the 'name' attribute of the 'Class' model
            },
        });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({
            error: error || 'An error occurred while fetching the student',
        });
    }
});

app.post('/edit-student', async (req, res) => {
    const { studentId, name, dob, gender, classId } = req.body;
    await Student.update({ name, dob, gender, classId }, { where: { studentId } });
    res.redirect('/');
});

app.post('/delete-student', async (req, res) => {
    const { studentId } = req.body;
    await Student.destroy({ where: { studentId } });
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
