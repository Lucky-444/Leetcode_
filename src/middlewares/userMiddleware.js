const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const redisClient = require("../config/redis.js"); 

const userMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    // Check blocklist first
    const isBlocked = await redisClient.get(`token:${token}`);
    if (isBlocked) {
      return res.status(403).json({ message: "Token is blocked, please login again" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const { id } = decoded;
    console.log("Decoded JWT:", decoded);
    // Check if _id is present
    console.log("User ID:", id);
    if (!id) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    req.result = result;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access", error });
  }
};


module.exports = userMiddleware;
