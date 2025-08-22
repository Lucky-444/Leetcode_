const axios = require("axios");

const getLanguageId = (language) => {
  const languageMap = {
    "javascript": 63, // Node.js 18
    "cpp": 54,        // C++ (GCC 11.2.0)
    "c++": 54,        // fallback
    "java": 62,       // Java (OpenJDK 17)
    "python": 71,     // Python 3.11
  };
  return languageMap[language.toLowerCase()] || null;
};


const submitBatch = async (submissions) => {
  // Submit the batch of code submissions to the judging system

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": "df200e80a5mshef09baf9ac39068p12c472jsn86143d398045",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log("submit response.data ===>", response.data);
      return response.data;
    } catch (error) {
      console.error('error in submitBatch:', error);
    }
  }

  return await fetchData();
};

const waiting = (ms) => {
  setTimeout(() => {
    return 1;
  }, ms);
};

const submitToken = async (resultTokens) => {
  // Submit the tokens to the judging system to check their status
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: resultTokens.join(","),
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "df200e80a5mshef09baf9ac39068p12c472jsn86143d398045",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while (true) {
    const result = await fetchData();

    const resultObtained = result.submissions.every(
      (submission) => submission.status.id > 2
    );

    if (resultObtained) {
      // All submissions are correct
      console.log("All submissions are correct");
      return result.submissions;
    }

    // Wait for a while before checking again
    await waiting(3000);
  }
};

module.exports = {
  getLanguageId,
  submitBatch,
  submitToken,
};
