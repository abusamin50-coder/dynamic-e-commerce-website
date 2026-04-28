const express = require('express');
const { 
    addOrderItems, 
    getUserStats 
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// User route (Protected)
router.post('/', protect, addOrderItems);

// Admin route for stats
router.get('/user-stats', protect, admin, getUserStats);

module.exports = router;