import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();

    if (res.xhr) {
        return res.json(posts);
    }

    return res.render('pages/posts', { posts });
};

const getPostById = async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
    });

    if (!post) {
        return res.status(404).send('Post not found');
    }

    if (res.xhr) {
        return res.json(post);
    }

    return res.render('pages/post-detail', { post });
};

export {
    getPosts,
    getPostById,
};
