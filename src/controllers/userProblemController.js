const Problem = require("../models/problem.js");
const { getLanguageId , submitBatch , submitToken } = require("../utils/problemUtility.js");

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

      for(const submission of testResult) {
        if (submission.status.id != 3) {
                //TODO : return error status according to submission.status.id
                //TODO : implement error handling based on status.id
                //TODO : log the error message and send appropriate error message to your frontend
                //so that the user can understand what went wrong
          return res.status(400).json({ message: `Submission ${submission.id} is incorrect` });
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
    res.status(500).json({ message: "Error creating problem", error: error.message });
  }
};







module.exports = {
  createProblem,
};
