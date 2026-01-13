/**
 * Standard API response format
 */
class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}

/**
 * Helper function to send success response
 */
const sendSuccess = (res, statusCode = 200, data = null, message = 'Success') => {
    return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

/**
 * Helper function to send error response
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
    const response = {
        statusCode,
        success: false,
        message,
    };

    if (process.env.NODE_ENV === 'development' && error) {
        response.error = error;
    }

    return res.status(statusCode).json(response);
};

module.exports = {
    ApiResponse,
    sendSuccess,
    sendError,
};
