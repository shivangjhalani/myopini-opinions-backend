const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array()
    });
  }
  next();
};

const validatePrediction = [
  body('question').trim().notEmpty().withMessage('Question is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('expiryTime')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom(value => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expiry time must be in the future');
      }
      return true;
    }),
    validate
];

const validateOpinion = [
  body('predictionId')
    .isUUID()
    .withMessage('Invalid prediction ID format'),
  body('userId')
    .trim()
    .notEmpty()
    .withMessage('User ID is required'),
  body('opinion')
    .trim()
    .isIn(['Yes', 'No'])
    .withMessage('Opinion must be either Yes or No'),
  body('amount')
    .isInt({ min: 1 })
    .withMessage('Amount must be a positive number'),
  validate
];

module.exports = { validatePrediction, validateOpinion };