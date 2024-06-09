const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStudents = async (req, res) => {
    const students = await prisma.student.findMany({ include: { class: true } });

    return res.json(students);
};

exports.getStudentById = async (req, res) => {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
        where: { id: parseInt(id, 10) },
        include: { class: true },
    });

    return res.json(student);
};

exports.addStudent = async (req, res) => {
    const { student_id, name, dob, gender, class_id } = req.body;

    const student = await prisma.student.create({
        data: {
            student_id,
            name,
            dob,
            gender,
            class_id: parseInt(class_id, 10),
        },
    });

    if (req.xhr) {
        return res.json(student);
    }

    return res.redirect('/');
};

exports.editStudent = async (req, res) => {
    const { student_id, name, dob, gender, class_id } = req.body;

    const student = await prisma.student.update({
        where: { student_id },
        data: {
            name,
            dob,
            gender,
            class_id: parseInt(class_id, 10),
        },
    });

    if (req.xhr) {
        return res.json(student);
    }

    return res.redirect('/');
};
