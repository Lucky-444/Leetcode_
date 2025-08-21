const express = require('express');

const router = express.Router();

//create Problem
router.post('/create', problemCreate);

//fetch Problems
router.get('/:id', problemFetch);

//All problems fetch
router.get('/', problemFetchAll);

//Update Problem
router.put('/:id', problemUpdate);

//Delete Problem
router.delete('/:id', problemDelete);

//particular user solved the problems
router.get('/user/:id/solved', userSolvedProblems);

module.exports = router;
