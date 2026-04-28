const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env variables (Path specify করে দেওয়া ভালো)
dotenv.config({ path: path.join(__dirname, '.env') });

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

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// --- Static Files & Frontend Serving ---
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// সব নন-এপিআই রিকোয়েস্টের জন্য index.html পাঠানো
app.get('*', (req, res) => {
    // API call না হলে index.html দেখাবে
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});

// Global Error Handler (Render এ এরর ডিবাগ করতে সাহায্য করবে)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});