const express = require('express');
const { submitOpinion, getOpinions, getOpinionsByPrediction } = require('../controllers/opinionController');
const { validateOpinion } = require('../middleware/validators');

const router = express.Router();

router.post('/opinion', validateOpinion, submitOpinion);
router.get('/opinions', getOpinions);
router.get('/opinions/:predictionId', getOpinionsByPrediction);

module.exports = router;