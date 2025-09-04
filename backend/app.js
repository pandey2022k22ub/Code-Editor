const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const generateRoutes = require('./routes/generateRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
const allowedOrigins = [
  "http://localhost:3000",        // dev
  "https://code-editor-5yloklmq7-pandey2022k22ubs-projects.vercel.app/" 
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/sessions', sessionRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

module.exports = app;
