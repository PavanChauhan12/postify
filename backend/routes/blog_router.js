const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/jwtMiddleware');

// Create blog
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      excerpt = '',
      content = '',
      category,
      tags = [],
      status = 'draft',
      readTimeManual,
    } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required.' });

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      readTimeManual: readTimeManual || (content ? Math.ceil(content.length / 500) : undefined),
      author: req.user._id
    });

    await newBlog.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { blogs: newBlog._id } });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public: Get all published blogs
router.get('/all', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).populate('author', 'name email');
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get blog by ID with view tracking
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name username avatar');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const viewEntry = {
      ip: req.ip,
      viewedAt: new Date()
    };

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_KEY_SECRET);
        viewEntry.user = decoded._id || decoded.id || decoded.email;
      } catch (e) {}
    }

    blog.views.push(viewEntry);
    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update content/status
router.put('/:id/content', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (String(blog.author) !== String(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    const { content, status } = req.body;
    if (status === 'published' && (!content || content.trim() === ''))
      return res.status(400).json({ message: 'Content is required to publish' });

    blog.content = content || blog.content;
    blog.status = status || blog.status;

    await blog.save();
    res.status(200).json({ message: 'Blog updated', blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a comment
router.post('/:id/comment', async (req, res) => {
  try {
    const { name = 'Anonymous', text } = req.body;
    if (!text || text.trim() === '')
      return res.status(400).json({ message: 'Comment text is required' });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({ name, text, date: new Date() });
    await blog.save();

    res.status(201).json({ message: 'Comment added', comments: blog.comments });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Like a blog
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const alreadyLiked = blog.likes.some(
      (like) => String(like.user) === String(req.user._id)
    );
    if (alreadyLiked) {
      return res.status(400).json({ message: 'You already liked this blog' });
    }

    blog.likes.push({
      user: req.user._id,
      name: req.user.name,
      likedAt: new Date()
    });

    await blog.save();
    res.status(200).json({ message: 'Blog liked', likes: blog.likes.length });
  } catch (err) {
    console.error('Error liking blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 🔧 Dev-only: Fix corrupted blog document (likes/comments = 0)
router.post('/:id/fix', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.likes = Array.isArray(blog.likes) ? blog.likes.filter(l => typeof l === 'object') : [];
    blog.comments = Array.isArray(blog.comments) ? blog.comments.filter(c => typeof c === 'object') : [];

    await blog.save();
    res.json({ message: 'Corrupt blog fixed', blog });
  } catch (err) {
    res.status(500).json({ message: 'Error fixing blog', error: err.message });
  }
});

module.exports = router;
