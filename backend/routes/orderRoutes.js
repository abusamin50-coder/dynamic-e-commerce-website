const express = require('express');
const router = express.Router();
const { addOrderItems, getUserStats } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/user-stats').get(protect, admin, getUserStats);

module.exports = router;