const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getHomepage = async (req, res) => {
    const students = await prisma.student.findMany({ include: { class: true } });

    const classes = await prisma.class.findMany();

    return res.render('index', { students, classes });
};
