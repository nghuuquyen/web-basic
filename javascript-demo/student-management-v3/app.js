'use strict';

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {sequelize, Student} = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    store: new SequelizeStore({db: sequelize}),
    resave: false,
    saveUninitialized: false,
}));

app.get('/', async (req, res) => {
    const students = await Student.findAll();
    res.render('index', {students});
});

app.post('/add-student', async (req, res) => {
    const {studentId, name, dob, gender, className} = req.body;
    await Student.create({studentId, name, dob, gender, className});
    res.redirect('/');
});

app.get('/api/student/:studentId', async (req, res) => {
    try {
        const student = await Student.findOne({where: {studentId: req.params.studentId}});
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({error: 'Student not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'An error occurred while fetching the student'});
    }
});

app.post('/edit-student', async (req, res) => {
    const {studentId, name, dob, gender, className} = req.body;
    await Student.update({name, dob, gender, className}, {where: {studentId}});
    res.redirect('/');
});

app.post('/delete-student', async (req, res) => {
    const {studentId} = req.body;
    await Student.destroy({where: {studentId}});
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
