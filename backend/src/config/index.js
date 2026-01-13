/**
 * Environment configuration module
 * Validates and exports environment variables
 */

const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Validate required environment variables
 */
const validateEnv = () => {
    const required = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

/**
 * Environment configuration object
 */
const config = {
    // Server
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,

    // Database
    database: {
        uri: process.env.MONGODB_URI,
    },

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET,
        expire: process.env.JWT_EXPIRE || '7d',
        refreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
    },

    // CORS
    cors: {
        origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'],
    },

    // Email (optional)
    email: {
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10) || 587,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM,
    },

    // Rate limiting (optional)
    rateLimit: {
        max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // 15 minutes
    },

    // File upload (optional)
    upload: {
        maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
        path: process.env.UPLOAD_PATH || './uploads',
    },

    // AI/Chatbot (optional)
    ai: {
        openaiKey: process.env.OPENAI_API_KEY,
        anthropicKey: process.env.ANTHROPIC_API_KEY,
        googleAiKey: process.env.GOOGLE_AI_API_KEY,
    },

    // Session (optional)
    session: {
        secret: process.env.SESSION_SECRET,
    },

    // Logging (optional)
    log: {
        level: process.env.LOG_LEVEL || 'info',
    },
};

// Validate environment in production
if (config.env === 'production') {
    validateEnv();
}

module.exports = config;
