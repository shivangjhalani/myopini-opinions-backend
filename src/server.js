const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { NotFoundError } = require('./utils/errors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const predictionRoutes = require('./routes/predictionRoutes');
const opinionRoutes = require('./routes/opinionRoutes');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MyOpini API' });
});

app.use('/api', predictionRoutes);
app.use('/api', opinionRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});