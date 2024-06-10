import express from 'express';
import { getHomepage } from './controllers/homepage-controller.js';
import { getPosts, getPostById } from './controllers/post-controller.js';

const router = express.Router();

router.get('/', getHomepage);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);

export default router;
