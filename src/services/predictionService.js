const Prediction = require('../models/Prediction');

const addPrediction = async ({ question, category, expiryTime }) => {
  try {
    const predictionData = {
      question,
      category,
      expiryTime: new Date(expiryTime)
    };

    const newPrediction = await Prediction.create(predictionData);
    return newPrediction._id;
  } catch (error) {
    throw error; // Will be caught by controller
  }
};

const fetchActivePredictions = async () => {
  const now = new Date();
  const predictions = await Prediction.find({ 
    expiryTime: { $gt: now } 
  })
  .select('-__v')
  .sort({ expiryTime: 1 }); // Sort by expiry time ascending

  return predictions;
};

const fetchExpiredPredictions = async () => {
  const now = new Date();
  const predictions = await Prediction.find({ 
    expiryTime: { $lte: now } 
  })
  .select('-__v')
  .sort({ expiryTime: -1 }); // Sort by expiry time descending (most recently expired first)

  return predictions;
};

module.exports = {
  addPrediction,
  fetchActivePredictions,
  fetchExpiredPredictions
};