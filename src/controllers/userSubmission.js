const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { getLanguageId, submitBatch, submitToken } = require("../utils/problemUtility");

const submitProblem = async (req, res) => {
  const { id } = req.params;
  const problemId = req.params.id;
  const userId = req.result._id;
  const { code, language } = req.body;

  try {
    // Validate input
    if (!problemId || !userId || !code || !language) {
      return res.status(400).json({ message: "Some Fields are missing" });
    }

    // Find the problem by ID
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    //first we store all the code and language in our database before giving the code to the judge0
    //becoz we need to keep track of all submissions and their statuses
    //becoz we need to calculate the testcases , runtime , memory
    //pending state kardo
    // Create a new submission
    const submissionResult = await new Submission({
      userId,
      problemId: problemId,
      code,
      language,
      testCasesTotal: problem.hiddenTestCases.length,
    });
    //now send it to Judge0
    const languageId = getLanguageId(language);
    const submissions = problem.hiddenTestCases.map((testcases) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcases.input,
      expected_output: testcases.output,
    }));

    //now submit the code submission
    const submitResult = await submitBatch(submissions);
    //fetching the result token

    const resultToken = submitResult.map((value) => value.token);

    //now we update our submission Result
    const testResult = await submitToken(resultToken);

    let testPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "accepted";
    let message = "";
    for (const test of testResult) {
      if (test.status_id === 3) {   // ✅ Accepted
        testPassed += 1;
        runtime += parseFloat(test.time);   // Judge0 field is `time`, not `runtime`
        memory = Math.max(memory, test.memory);
      } else if (test.status_id === 4) {   // ✅ Compilation error
        status = "error";
        message = test.stderr || test.compile_output || test.message;
      } else {
        status = "wrong_answer";
        message = test.stderr || test.compile_output || test.message;
      }
    }
    // Update the submission result
    submissionResult.testCasesPassed = testPassed;
    submissionResult.runtime = runtime;
    submissionResult.memory = memory;
    submissionResult.status = status;
    submissionResult.errorMessage = message;
    // Save the submission
    await submissionResult.save();

    //now we add the problemId into user's problemsolved array
    //if the user already solved the problem before 
    //then we dont add it to the array
    //else we add it to user's problemsolved array
    //we store user in req.result
    //after login by the user

    if(!req.result.problemSolved.includes(problemId)) {
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }


    const accepted = status === "accepted";
    return res
      .status(201)
      .json({
        message,
        data: submissionResult,
        accepted,
        totalTestCases: problem.hiddenTestCases.length,
        passedTestCases: submissionResult.testCasesPassed,
        runtime: submissionResult.runtime,
        memory: submissionResult.memory,
        msg: "Problem submitted successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error submitting problem", error: error.message });
  }
};

const runCode = async(req , res) => {
  const { id } = req.params;
  const problemId = req.params.id;
  const userId = req.result._id;
  const { code, language } = req.body;

  try {
    // Validate input
      // Validate input
    if (!problemId || !userId || !code || !language) {
      return res.status(400).json({ message: "Some Fields are missing" });
    }

    // Find the problem by ID
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    //first we store all the code and language in our database before giving the code to the judge0
    //becoz we need to keep track of all submissions and their statuses
    //becoz we need to calculate the testcases , runtime , memory
    //pending state kardo
    //for run a code we dont need to create a new submission and save it into our DB
    //now send it to Judge0
    const languageId = getLanguageId(language);
    const submissions = problem.visibleTestCases.map((testcases) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcases.input,
      expected_output: testcases.output,
    }));

    //now submit the code submission
    const submitResult = await submitBatch(submissions);
    //fetching the result token

    const resultToken = submitResult.map((value) => value.token);

    //now we update our submission Result
    const testResult = await submitToken(resultToken);

    let testPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "accepted";
    let message = "";
    for (const test of testResult) {
      if (test.status_id === 3) {   // ✅ Accepted
        testPassed += 1;
        runtime += parseFloat(test.time);   // Judge0 field is `time`, not `runtime`
        memory = Math.max(memory, test.memory);
      } else if (test.status_id === 4) {   // ✅ Compilation error
        status = "error";
        message = test.stderr || test.compile_output || test.message;
      } else {
        status = "wrong_answer";
        message = test.stderr || test.compile_output || test.message;
      }
    }

    const accepted = status === "accepted";

    return res.status(200).json({
      success : status ,
      testCases : testResult,
      runtime,
      memory,
      message 
    });
  } catch (error) {
    return res.status(500).json({ message: "Error running code", error: error.message });
  }
};


module.exports = {
  submitProblem,
  runCode,
};
