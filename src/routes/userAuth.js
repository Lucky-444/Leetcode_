const express = require('express');
const {registerUser , loginUser , logoutUser , forgotPassword , getProfile , registerAdmin , deleteProfile} = require('../controllers/userController.js');
const {userMiddleware , adminMiddleware } = require('../middlewares/userMiddleware.js');
const router = express.Router();

//Register
router.post('/register', registerUser);

//Admin Register
router.post('/admin/register', adminMiddleware, registerAdmin);

// Login
router.post('/login', loginUser);

// Logout
router.post('/logout', userMiddleware, logoutUser);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Get Profile
router.get('/profile', getProfile);

// Delete Profile
router.delete('/delete' , userMiddleware , deleteProfile)

module.exports = router;