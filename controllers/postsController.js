const { validationResult } = require('express-validator');
const Post = require('../models/postModel');
// const User = require('../models/userModel');

// View all blog posts
const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'An error occured... :(' });
    }
  };
  
  // View a specific blog post
  const getPostById = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Create a new blog post
  const createPost = async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const newPost = new Post({ title, content });
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
  // Update a blog post
  const updatePost = async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
  
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
  // Delete a blog post
  const deletePost = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };
  
