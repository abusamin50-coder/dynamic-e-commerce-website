const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        }
    ],
    totalPrice: { type: Number, required: true, default: 0.0 },
}, {
    timestamps: true
});

// Use existing model if it exists, otherwise create a new one
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;