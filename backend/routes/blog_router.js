const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/jwtMiddleware');
const blogController = require('../controllers/blog_controller');

router.post('/create', authMiddleware, blogController.createBlog);
router.get('/all', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id/content', authMiddleware, blogController.updateBlogContent);
router.post('/:id/comment', blogController.addComment);
router.post('/:id/like', authMiddleware, blogController.likeBlog);
router.put('/:id/edit', authMiddleware, blogController.editBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;