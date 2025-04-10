const opinionService = require('../services/opinionService');

const submitOpinion = async (req, res, next) => {
  try {
    const { predictionId, userId, opinion, amount } = req.body;
    
    await opinionService.addOpinion({
      predictionId,
      userId,
      opinion,
      amount: Number(amount)
    });

    res.status(201).json({
      success: true,
      message: 'Opinion submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getOpinions = async (req, res, next) => {
  try {
    const opinions = await opinionService.fetchOpinions();
    res.status(200).json({
      success: true,
      count: opinions.length,
      data: opinions
    });
  } catch (error) {
    next(error);
  }
};

const getOpinionsByPrediction = async (req, res, next) => {
  try {
    const { predictionId } = req.params;
    const opinions = await opinionService.fetchOpinionsByPrediction(predictionId);
    
    res.status(200).json({
      success: true,
      count: opinions.length,
      data: opinions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  submitOpinion, 
  getOpinions,
  getOpinionsByPrediction 
};