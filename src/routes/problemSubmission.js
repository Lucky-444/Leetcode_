const express = require('express');
const { userMiddleware } = require('../middlewares/userMiddleware');
const { submitProblem, runCode } = require('../controllers/userSubmission');

const router = express.Router();

// Problem submission routes

router.post('/:id', userMiddleware, submitProblem);
router.post('/:id/run', userMiddleware, runCode);


module.exports = router;