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
const __dirname1 = path.resolve();

// This tells Express to serve all files (CSS, JS, Images) from the frontend folder
app.use(express.static(path.join(__dirname1, 'frontend')));

// Handle the home page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'index.html'));
});

// Handle any other page (like /login or /cart)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'index.html'));
});

// PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});