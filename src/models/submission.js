const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["javascript", "python", "java", "cpp", "c++", "go"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "wrong_answer" , "error"],
      default: "pending",
    },
    runtime: {
      type: Number, // in milliseconds
      default: 0,
    },
    memory: {
      type: Number, // in kilobytes or in Mb's
      default: 0,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    testCasesTotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    
  }
);

//making compound index
// userId and problemId in ascending order
submissionSchema.index({ userId: 1, problemId: 1 });

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
