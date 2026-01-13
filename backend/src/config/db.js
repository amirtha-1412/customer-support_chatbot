const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.database.uri);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
        });

    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);
        console.warn('⚠️  Server will continue without database connection');
        console.warn('💡 Make sure MongoDB is running or update MONGODB_URI in .env');
        // Don't exit - allow server to run without DB for development
    }
};

module.exports = connectDB;

