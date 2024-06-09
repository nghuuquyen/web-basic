const express = require('express');

const { getHomepage } = require('./controllers/homepage-controller');
const { getStudents, addStudent, editStudent, getStudentById } = require('./controllers/student-controller');
const { getClasses } = require('./controllers/class-controller');

const router = express.Router();

router.get('/', getHomepage);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.post('/add-student', addStudent);
router.post('/edit-student', editStudent);
router.get('/classes', getClasses);

module.exports = router;
