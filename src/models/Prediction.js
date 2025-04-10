const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PredictionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  expiryTime: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // This uses MongoDB's internal timestamp system
});

// Create index on expiryTime for query optimization
PredictionSchema.index({ expiryTime: 1 });

module.exports = mongoose.model('Prediction', PredictionSchema);