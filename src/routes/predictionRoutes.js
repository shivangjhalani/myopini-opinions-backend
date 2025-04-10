const express = require('express');
const { createPrediction, getActivePredictions, getExpiredPredictions } = require('../controllers/predictionController');
const { validatePrediction } = require('../middleware/validators');

const router = express.Router();

router.post('/prediction', validatePrediction, createPrediction);
router.get('/predictions/active', getActivePredictions);
router.get('/predictions/expired', getExpiredPredictions);

module.exports = router;