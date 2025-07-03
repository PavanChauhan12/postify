const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  category: { type: String },
  tags: [{ type: String }], // Array of strings for tags
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  readTimeManual: { type: Number }, // Estimated read time in minutes
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 }, // Placeholder for comment count
  publishedAt: { type: Date }, // Will be set when status is 'published'
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created the blog
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to set publishedAt when status changes to 'published'
blogSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  this.updatedAt = new Date(); // Update updatedAt on every save
  next();
});

module.exports = mongoose.model('Blog', blogSchema);