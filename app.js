const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
require('dotenv').config();

const app = express();
app.use(express.json());

// Use the posts route
app.use('/api/posts', postsRoute);

// Connect to MongoDB
const mongoDBUrl = process.env.MONGODB_CONNECTION_URI;

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
