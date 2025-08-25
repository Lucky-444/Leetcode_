const redisClient = require("../config/redis.js");
const Submission = require("../models/submission.js");
const User = require("../models/user.js");
const validate = require("../utils/validator.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, email, password, age } = req.body;
    //first validate the user inputs
    
    validate(req.body);

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      role: 'user',
    });
    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email , role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

const registerAdmin = async(req , res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, email, password, age } = req.body;

    // Validate the user inputs
    validate(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      role: 'admin',
    });
    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email  , role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "Admin registered successfully", user: newUser, token });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Error registering admin",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, email: user.email , role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(400).json({
      message: "Error logging in",
      error: error.message || error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    const payLoad = jwt.decode(token);

    // Block this specific token until it expires
    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payLoad.exp);

    // Clear cookie
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token and send it to the user
    const token = user.generatePasswordResetToken();
    await user.save();

    // Send email with password reset link (implementation not shown)
    res.status(200).json({ message: "Password reset email sent", token });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

const deleteProfile = async(req , res) => {
   try {

    const user = await User.findByIdAndDelete(req.result._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //delete all submission of the user
    const submissions = await Submission.deleteMany({ userId: req.result._id });

    res.status(200).json({ message: "Profile deleted successfully", data: submissions, user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};


module.exports = {
  registerUser,
  registerAdmin,
  deleteProfile,
  loginUser,
  logoutUser,
  forgotPassword,
  getProfile,
};
