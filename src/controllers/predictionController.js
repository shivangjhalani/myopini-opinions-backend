const predictionService = require('../services/predictionService');

const createPrediction = async (req, res, next) => {
  try {
    const { question, category, expiryTime } = req.body;
    
    const predictionId = await predictionService.addPrediction({
      question,
      category,
      expiryTime
    });

    res.status(201).json({
      success: true,
      message: 'Prediction created successfully',
      data: { predictionId }
    });
  } catch (error) {
    next(error);
  }
};

const getActivePredictions = async (req, res, next) => {
  try {
    const predictions = await predictionService.fetchActivePredictions();
    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions
    });
  } catch (error) {
    next(error);
  }
};

const getExpiredPredictions = async (req, res, next) => {
  try {
    const predictions = await predictionService.fetchExpiredPredictions();
    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  createPrediction,
  getActivePredictions,
  getExpiredPredictions
};