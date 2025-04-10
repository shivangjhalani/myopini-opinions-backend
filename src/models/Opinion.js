const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OpinionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  predictionId: {
    type: String,
    required: [true, 'PredictionId is required'],
    ref: 'Prediction'
  },
  userId: {
    type: String,
    required: [true, 'UserId is required'],
    trim: true
  },
  opinion: {
    type: String,
    required: [true, 'Opinion is required'],
    enum: {
      values: ['Yes', 'No'],
      message: 'Opinion must be either Yes or No'
    }
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be at least 1']
  }
}, {
  timestamps: true // Uses MongoDB's internal timestamp system
});

// Create indexes for better query performance
OpinionSchema.index({ predictionId: 1 });
OpinionSchema.index({ userId: 1 });

// Compound index for preventing duplicate opinions from same user on same prediction
OpinionSchema.index({ predictionId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Opinion', OpinionSchema);