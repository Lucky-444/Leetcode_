const express = require('express');
const { adminMiddleware } = require('../middlewares/userMiddleware');
const { createProblem } = require('../controllers/userProblemController');

const router = express.Router();

//create Problem
router.post('/create', adminMiddleware, createProblem);

// //fetch Problems
// router.get('/:id', getProblemById);

// //All problems fetch
// router.get('/',getAllProblems);

// //Update Problem
// router.put('/:id', adminMiddleware, updateProblem);

// //Delete Problem
// router.delete('/:id', adminMiddleware, deleteProblem);

// //particular user solved the problems
// router.get('/user/:id/solved', userSolvedProblems);

module.exports = router;
