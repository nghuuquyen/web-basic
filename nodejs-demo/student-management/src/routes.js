const express = require('express');

const { getHomepage } = require('./controllers/homepage-controller');
const { getStudents, getStudentById, addStudent, editStudent, deleteStudent } = require('./controllers/student-controller');
const { getClasses } = require('./controllers/class-controller');

const router = express.Router();

router.get('/', getHomepage);
router.get('/students', getStudents);
router.get('/students/:studentId', getStudentById);
router.post('/add-student', addStudent);
router.post('/edit-student', editStudent);
router.post('/delete-student', deleteStudent);
router.get('/classes', getClasses);

module.exports = router;
