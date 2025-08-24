const Problem = require("../models/problem.js");
const User = require("../models/user.js");
const {
  getLanguageId,
  submitBatch,
  submitToken,
} = require("../utils/problemUtility.js");

const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      referenceSolution,
      visibleTestCases,
      hiddenTestCases,
      starterCode,
      problemCreator,
    } = req.body;

    for (const { language, completeCode } of referenceSolution) {
      // Validate each element in the referenceSolution array
      if (!language || !completeCode) {
        return res
          .status(400)
          .json({ message: "Invalid reference solution format" });
      }

      //we require the following fields for each submission
      //source_code
      //language_id
      //stdin :
      //expected_output :

      const languageId = getLanguageId(language);
      //we use batch formed submission
      // console.log("languageId ===>", languageId);
      const submissions = visibleTestCases.map((testcases) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcases.input,
        expected_output: testcases.output,
      }));

      // console.log("submissions ===>" , submissions);
      //now submit the code submission
      const submitResult = await submitBatch(submissions);

      // console.log("submitResult ===>", submitResult);
      //after that it gives us a token
      //we pass these token array to our judge0 to check corresponding status
      //if status id == 3 -> means code is correct and accepted

      const resultToken = submitResult.map((value) => value.token);

      // console.log("result ===>" , resultToken);
      //[token1 , token2 , token3] , comma separated token array
      // -> we need to check the status of these tokens

      const testResult = await submitToken(resultToken);
      //now iterate on testResult array and check the status_id for each submission

      for (const submission of testResult) {
        if (submission.status.id != 3) {
          //TODO : return error status according to submission.status.id
          //TODO : implement error handling based on status.id
          //TODO : log the error message and send appropriate error message to your frontend
          //so that the user can understand what went wrong
          return res
            .status(400)
            .json({ message: `Submission ${submission.id} is incorrect` });
        } else {
          console.log(`Submission ${submission.language_id} is correct`);
        }
      }

      // If all submissions are correct, proceed with creating the problem
      // You can save the problem details to your database here
    }

    //all tests passed
    //now save it in our database

    await Problem.create({
      ...req.body,
      problemCreator: req.result._id, // Assuming req.user or req.result is set by your authentication middleware
    });

    return res.status(201).json({ message: "Problem created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating problem", error: error.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Problem ID is required or Invalid problem ID" });
    }

    //then check the id is present in our database or not
    const DsaProblem = await Problem.findById(id);
    if (!DsaProblem) {
      return res
        .status(404)
        .json({ message: "Problem not found in our database" });
    }

    const {
      title,
      description,
      difficulty,
      tags,
      referenceSolution,
      visibleTestCases,
      hiddenTestCases,
      starterCode,
      problemCreator,
    } = req.body;
    //first we check the reference solution sent by the user after update the problem
    // if it is correct then we update the problem
    for (const { language, completeCode } of referenceSolution) {
      // Validate each element in the referenceSolution array
      if (!language || !completeCode) {
        return res
          .status(400)
          .json({ message: "Invalid reference solution format" });
      }

      //we require the following fields for each submission
      //source_code
      //language_id
      //stdin :
      //expected_output :

      const languageId = getLanguageId(language);
      //we use batch formed submission
      // console.log("languageId ===>", languageId);
      const submissions = visibleTestCases.map((testcases) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcases.input,
        expected_output: testcases.output,
      }));

      // console.log("submissions ===>" , submissions);
      //now submit the code submission
      const submitResult = await submitBatch(submissions);

      // console.log("submitResult ===>", submitResult);
      //after that it gives us a token
      //we pass these token array to our judge0 to check corresponding status
      //if status id == 3 -> means code is correct and accepted

      const resultToken = submitResult.map((value) => value.token);

      // console.log("result ===>" , resultToken);
      //[token1 , token2 , token3] , comma separated token array
      // -> we need to check the status of these tokens

      const testResult = await submitToken(resultToken);
      //now iterate on testResult array and check the status_id for each submission

      for (const submission of testResult) {
        if (submission.status.id != 3) {
          //TODO : return error status according to submission.status.id
          //TODO : implement error handling based on status.id
          //TODO : log the error message and send appropriate error message to your frontend
          //so that the user can understand what went wrong
          return res
            .status(400)
            .json({ message: `Submission ${submission.id} is incorrect` });
        } else {
          console.log(`Submission ${submission.language_id} is correct`);
        }
      }

      // If all submissions are correct, proceed with Updating  the problem
      // You can save the problem details to your database here
    }

    //now we update the problem in our database
    //why run validator = true
    // becoz in mongoose when we update a document the validators are not run by default so we need to set this option to true
    const newProblem = await Problem.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        runValidators: true,
        new: true, //to return the updated document
      }
    );

    return res
      .status(200)
      .json({ message: "Problem updated successfully", problem: newProblem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating problem", error: error.message });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Problem ID is required or Invalid problem ID" });
    }
    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting problem", error: error.message });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Problem ID is required or Invalid problem ID" });
    }

    //inside the select if you do -hiddenTestCases , it will exclude the hiddenTestCases field
    const problem = await Problem.findById(id).select(
      "_id title description tags visibleTestCases starterCode difficulty referenceSolution"
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res
      .status(200)
      .json({ message: "Problem fetched successfully", problem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching problem", error: error.message });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).select(
      "_id title description tags"
    );
    if (!problems || problems.length === 0) {
      return res.status(404).json({ message: "No problems found" });
    }

    return res
      .status(200)
      .json({ message: "All problems fetched successfully", problems });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching problems", error: error.message });
  }
};

const userSolvedProblems = async (req, res) => {
  const userId = req.result._id;

  try {
    const user = await User.findById(userId).populate({
      path: "problemSolved",
      select: "_id title description tags difficulty"
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User solved problems fetched successfully", problemSolved: user.problemSolved });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user solved problems", error: error.message });
  }
};

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblems,
  userSolvedProblems
};
