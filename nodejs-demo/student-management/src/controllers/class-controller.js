const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getClasses = async (req, res) => {
    const classes = await prisma.class.findMany();

    return res.json(classes);
};
