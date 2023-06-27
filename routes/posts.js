const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postsController');

// View all blog posts
router.get('/', getAllPosts);

// View a specific blog post
router.get('/:postId', getPostById);

// Create a new blog post
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  createPost
);

// Update a blog post
router.patch(
  '/:postId',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  updatePost
);

// Delete a blog post
router.delete('/:postId', deletePost);

module.exports = router;
