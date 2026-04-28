const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            console.error('❌ MONGO_URI is missing in .env');
            process.exit(1);
        }

        // In Mongoose 7, we don't need useNewUrlParser or useUnifiedTopology
        const conn = await mongoose.connect(uri);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;