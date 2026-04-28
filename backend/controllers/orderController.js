const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                totalPrice
            });

            const createdOrder = await order.save();
            return res.status(201).json(createdOrder);
        }
    } catch (error) {
        console.error(`Order Creation Error: ${error.message}`);
        return res.status(500).json({ message: 'Order creation failed' });
    }
};

// @desc    Get User Stats (Admin Only)
// @route   GET /api/orders/user-stats
const getUserStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: "$user",
                    totalSpent: { $sum: "$totalPrice" },
                    totalProducts: { $sum: { $size: "$orderItems" } }
                }
            }
        ]);
        return res.json(stats);
    } catch (error) {
        console.error(`Stats Fetch Error: ${error.message}`);
        return res.status(500).json({ message: 'Failed to fetch stats' });
    }
};

module.exports = { addOrderItems, getUserStats };