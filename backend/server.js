const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env variables
dotenv.config();

// DB connect
const connectDB = require('./config/db');

// Routes
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const orderRoutes = require('../routes/orderRoutes');

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

// --- Static Files & Frontend Routing ---

// Identify the absolute path to the frontend folder
const frontendPath = path.join(__dirname, '..', 'frontend');

// Serve all static files (CSS, JS, Images) from the frontend folder
app.use(express.static(frontendPath));

// Serve index.html for the root route and all other non-API routes
app.get('*', (req, res) => {
    // Check if the request is an API call; if not, send the index.html
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