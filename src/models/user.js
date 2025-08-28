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
    image: {
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
    problemSolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// 🔹 Generate RoboHash avatar automatically if not provided
newUserSchema.pre("save", function (next) {
  if (!this.image) {
    // use email or _id for uniqueness
    const uniqueText = this.email || this._id.toString();
    this.image = `https://robohash.org/${encodeURIComponent(uniqueText)}.png`;
  }
  next();
});

// 🔹 Cascade delete submissions when user is deleted
newUserSchema.post("findOneAndDelete", async function (userInfo) {
  if (userInfo) {
    await Submission.deleteMany({ userId: userInfo._id });
  }
});

const User = mongoose.model("User", newUserSchema);

module.exports = User;
