const express = require('express');
const {registerUser , loginUser , logoutUser , forgotPassword , getProfile} = require('../controllers/userController.js');
const userMiddleware = require('../middlewares/userMiddleware.js');
const router = express.Router();

//Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.post('/logout', userMiddleware, logoutUser);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Get Profile
router.get('/profile', getProfile);

module.exports = router;