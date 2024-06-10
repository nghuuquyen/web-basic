const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getHomepage = async (req, res) => {
    const posts = await prisma.post.findMany();
    return res.render('pages/homepage', { posts });
};
