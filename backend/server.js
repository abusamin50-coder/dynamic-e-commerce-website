const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('ProStore API is Running...'));

// THIS IS THE FIX: Render provides a dynamic PORT. 
// Locally, we use 5050 to avoid the "Already in use" error.
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});