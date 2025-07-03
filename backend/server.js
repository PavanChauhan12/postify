const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const authRoute = require("./routes/auth_router");
dotenv.config();

const app = express();

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/blogs', require('./routes/blog_router'));

app.listen(3000, () => {
  console.log("Server started at port: 3000");
});