const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env variables
dotenv.config();

// DB connect
const connectDB = require('./config/db');

// Routes (এখানে আমি পাথগুলো ঠিক করে দিয়েছি)
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

// --- Static Files & Frontend Serving ---

// backend ফোল্ডার থেকে এক ধাপ বাইরে গিয়ে frontend ফোল্ডার খুঁজে বের করা
const frontendPath = path.join(__dirname, '../frontend');

// static folder হিসেবে frontend কে সেট করা
app.use(express.static(frontendPath));

// সব নন-এপিআই রিকোয়েস্টের জন্য index.html পাঠানো
app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    } else {
        res.status(404).json({ message: "API endpoint not found" });
    }
});

// PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});