const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// --- SMART ENV LOADER ---
// 1. Try to load from backend folder
dotenv.config(); 
// 2. Try to load from root folder (if first one failed)
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

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));