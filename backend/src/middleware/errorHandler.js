const ApiError = require('../utils/ApiError');

/**
 * Error handling middleware
 * Catches all errors and sends appropriate response
 */
const errorHandler = (err, req, res, next) => {
    let error = err;

    // If it's not an ApiError, convert it
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, false, err.stack);
    }

    // Log error for debugging
    console.error('Error:', {
        message: error.message,
        statusCode: error.statusCode,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        path: req.path,
        method: req.method,
    });

    // Send error response
    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
};

/**
 * Handle 404 - Not Found
 */
const notFound = (req, res, next) => {
    const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
    next(error);
};

module.exports = {
    errorHandler,
    notFound,
};
