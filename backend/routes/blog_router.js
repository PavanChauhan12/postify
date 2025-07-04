const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Adjust path as needed
const User = require('../models/User'); // Adjust path as needed
const authMiddleware = require('../middlewares/jwtMiddleware'); // Assuming you have an auth middleware

// POST /blogs - Create a new blog post
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, status, readTimeManual } = req.body;
    const authorId = req.user._id; // Assuming authMiddleware adds user info to req.user

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      readTimeManual,
      author: authorId,
    });

    await newBlog.save();

    // Add the blog to the user's blogs array
    await User.findByIdAndUpdate(authorId, { $push: { blogs: newBlog._id } });

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// You would add more routes here for GET all blogs, GET blog by ID, PUT/DELETE blog, etc.
// Example: GET /blogs - Get all blogs (for the /blogs page)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate('author', 'name username avatar'); // Populate author details
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;