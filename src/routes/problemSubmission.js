const express = require('express');
const { userMiddleware } = require('../middlewares/userMiddleware');
const { submitProblem } = require('../controllers/userSubmission');

const router = express.Router();

// Problem submission routes

router.post('/:id', userMiddleware, submitProblem);


module.exports = router;