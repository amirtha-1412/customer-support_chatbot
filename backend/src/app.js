const express = require('express');
const cors = require('cors');
const config = require('./config');
const requestLogger = require('./middleware/requestLogger');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { sendSuccess } = require('./utils/ApiResponse');

const app = express();

// Middleware
app.use(cors({
    origin: config.cors.origin,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
if (config.env === 'development') {
    app.use(requestLogger);
}

// Health check route
app.get('/health', (req, res) => {
    sendSuccess(res, 200, {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: config.env
    }, 'Server is running');
});

// Root route
app.get('/', (req, res) => {
    sendSuccess(res, 200, {
        name: 'Customer Support Chatbot API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            api: '/api'
        }
    }, 'Welcome to Customer Support Chatbot API');
});

// API routes will be added here
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/chat', require('./routes/chat.routes'));

// 404 handler - must be after all routes
app.use(notFound);

// Error handling middleware - must be last
app.use(errorHandler);

module.exports = app;
