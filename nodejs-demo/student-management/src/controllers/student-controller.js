const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStudents = async (req, res) => {
    const students = await prisma.student.findMany({ include: { class: true } });

    return res.json(students);
};

exports.getStudentById = async (req, res) => {
    const { studentId } = req.params;

    const student = await prisma.student.findUnique({
        where: { studentId },
        include: { class: true },
    });

    return res.json(student);
};

exports.addStudent = async (req, res) => {
    const { studentId, name, dob, gender, classId } = req.body;

    const student = await prisma.student.create({
        data: {
            studentId,
            name,
            dob,
            gender,
            classId: parseInt(classId, 10),
        },
    });

    if (req.xhr) {
        return res.json(student);
    }

    return res.redirect('/');
};

exports.editStudent = async (req, res) => {
    const { studentId, name, dob, gender, classId } = req.body;

    const student = await prisma.student.update({
        where: { studentId },
        data: {
            name,
            dob,
            gender,
            classId: parseInt(classId, 10),
        },
    });

    if (req.xhr) {
        return res.json(student);
    }

    return res.redirect('/');
};

exports.deleteStudent = async (req, res) => {
    const { studentId } = req.body;

    const student = await prisma.student.delete({
        where: { studentId: studentId },
    });

    if (req.xhr) {
        return res.json(student);
    }

    return res.redirect('/');
};
