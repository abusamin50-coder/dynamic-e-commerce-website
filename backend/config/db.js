const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check for common variable name variations
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!uri) {
            console.log("------------------------------------------");
            console.error('❌ ERROR: MONGO_URI is MISSING in your .env file!');
            console.log("Checking current Directory:", process.cwd());
            console.log("------------------------------------------");
            process.exit(1);
        }

        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // If it's a whitelist error, this message will explain it
        process.exit(1);
    }
};

module.exports = connectDB;