const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env variables
dotenv.config();

// DB connect
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// --- Serving Vanilla Frontend Files ---
// path.resolve() প্রজেক্টের রুট ডিরেক্টরি (MY-ECOMMERCE) খুঁজে বের করবে
const rootDir = path.resolve();

// Static Folder হিসেবে frontend ফোল্ডারকে চিনিয়ে দেওয়া
app.use(express.static(path.join(rootDir, 'frontend')));

// যদি এনভায়রনমেন্ট প্রোডাকশন হয় তবে ইনডেক্স ফাইল দেখানো
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(rootDir, 'frontend', 'index.html'));
    });
} else {
    // লোকাল হোস্টে টেস্ট করার জন্য
    app.get('/', (req, res) => {
        res.send('ProStore API is Running in Development...');
    });
}

// PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});