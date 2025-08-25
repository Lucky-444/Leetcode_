const express = require('express');
const { adminMiddleware , userMiddleware } = require('../middlewares/userMiddleware');
const { createProblem  , updateProblem , deleteProblem , getProblemById , getAllProblems , userSolvedProblems , submittedProblem} = require('../controllers/userProblemController');

const router = express.Router();

//create Problem
router.post('/create', adminMiddleware, createProblem);

//fetch Problems
router.get('/problemById/:id', userMiddleware,getProblemById);

//All problems fetch
router.get('/getAllProblems',userMiddleware,getAllProblems);

//Update Problem
router.put('/update/:id', adminMiddleware, updateProblem);

//Delete Problem
router.delete('/delete/:id', adminMiddleware, deleteProblem);

//particular user solved the problems
router.get('/problemSolvedByUser', userMiddleware,userSolvedProblems);

// findout all submissions by user with corresponding problemId
router.get('/submittedProblem/:problemId', userMiddleware , submittedProblem);

module.exports = router;
