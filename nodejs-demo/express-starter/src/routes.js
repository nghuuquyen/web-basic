const express = require('express');

const homepageController = require('./controllers/homepage-controller');
const postController = require('./controllers/post-controller');

const router = express.Router();

router.get('/', homepageController.getHomepage);
router.get('/posts', postController.getPosts);
router.get('/post/:id', postController.getPostById);

module.exports = router;
