'use strict';

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize, Student, Class } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
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
    res.render('index');
});

app.get('/students', async (req, res) => {
    const students = await Student.findAll({
        include: {
            model: Class,
            as: 'class',
            attributes: ['id', 'name'], // Include only the 'name' attribute of the 'Class' model
        },
    });

    res.json(students);
});

app.get('/classes', async (req, res) => {
    const classes = await Class.findAll();

    res.json(classes);
});

app.post('/add-student', async (req, res) => {
    const { studentId, name, dob, gender, classId } = req.body;
    await Student.create({ studentId, name, dob, gender, classId });
    res.json({ ok: true });
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
    res.json({ ok: true });
});

app.post('/delete-student', async (req, res) => {
    const { studentId } = req.body;
    await Student.destroy({ where: { studentId } });
    res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
