const mongoose = require("mongoose");
const Submission = require("./submission");

const newUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 15,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    problemSolved: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Problem",
        }
      ],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

newUserSchema.post('findOneAndDelete', async function(userInfo) {
  if (userInfo) {
    await Submission.deleteMany({ userId: userInfo._id });
  }
});

const User = mongoose.model("User", newUserSchema);

module.exports = User;
