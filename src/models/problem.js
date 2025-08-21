const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    tags: [{ type: String }],
    visibleTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String, required: true },
      },
    ],
    hiddenTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
      },
    ],
    starterCode: [
      {
        language: { type: String, required: true },
        initialCode: { type: String, required: true },
      },
    ],
    problemCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
