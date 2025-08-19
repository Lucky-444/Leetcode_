const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const userMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const { _id } = decoded;
    if (!_id) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    ///check if already present in redis blocklist
    const isBlocked = await redisClient.get(`blocklist:${_id}`);
    if (isBlocked) {
      return res.status(403).json({ message: "User is blocked" });
    }
    req.result = result;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access", error });
  }
};

module.exports = userMiddleware;
