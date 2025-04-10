const Prediction = require('../models/Prediction');
const Opinion = require('../models/Opinion');
const { NotFoundError, BadRequestError } = require('../utils/errors');

const addOpinion = async ({ predictionId, userId, opinion, amount }) => {
  // Check if prediction exists and is not expired
  const prediction = await Prediction.findById(predictionId);
  if (!prediction) {
    throw new NotFoundError('Prediction not found');
  }

  if (prediction.expiryTime <= new Date()) {
    throw new BadRequestError('Prediction has expired');
  }

  // Create opinion
  const opinionData = {
    predictionId,
    userId,
    opinion,
    amount
  };

  try {
    const newOpinion = await Opinion.create(opinionData);
    return newOpinion._id;
  } catch (error) {
    // Handle duplicate opinion
    if (error.code === 11000) {
      throw new BadRequestError('You have already submitted an opinion for this prediction');
    }
    throw error;
  }
};

const fetchOpinions = async () => {
  const opinions = await Opinion.find()
    .select('-__v')
    .sort({ createdAt: -1 }); // Most recent first
  return opinions;
};

const fetchOpinionsByPrediction = async (predictionId) => {
  // First verify prediction exists
  const prediction = await Prediction.findById(predictionId);
  if (!prediction) {
    throw new NotFoundError('Prediction not found');
  }

  const opinions = await Opinion.find({ predictionId })
    .select('-__v')
    .sort({ createdAt: -1 }); // Most recent first
  
  return opinions;
};

module.exports = {
  addOpinion,
  fetchOpinions,
  fetchOpinionsByPrediction
};