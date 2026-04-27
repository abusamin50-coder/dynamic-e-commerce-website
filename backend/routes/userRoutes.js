const express = require('express');
const { 
    registerUser, 
    authUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// User Profile routes (Protected)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Admin only routes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;