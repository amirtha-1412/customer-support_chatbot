const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/ApiResponse');

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
    try {
        const { username, name, email, password, role } = req.body;

        // Use name if username is not provided
        const finalUsername = username || name;

        if (!finalUsername) {
            return next(new ApiError(400, 'Please provide a username or name'));
        }

        // Check if user exists (email or finalUsername)
        const userExists = await User.findOne({
            $or: [{ email }, { username: finalUsername }]
        });

        if (userExists) {
            return next(new ApiError(400, 'User already exists with this email or username'));
        }

        // Create user (password hashing is handled in model)
        const user = await User.create({
            username: finalUsername,
            email,
            password,
            role
        });

        // Create token
        const token = user.getSignedJwtToken();

        sendSuccess(res, 201, {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        }, 'User registered successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return next(new ApiError(400, 'Please provide an email and password'));
        }

        // Check for user (and explicitly include password because of select: false)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next(new ApiError(401, 'Invalid credentials'));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ApiError(401, 'Invalid credentials'));
        }

        // Create token
        const token = user.getSignedJwtToken();

        sendSuccess(res, 200, {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        }, 'User logged in successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
    try {
        // user is already attached to req by protect middleware
        const user = req.user;

        sendSuccess(res, 200, {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, 'User data retrieved successfully');
    } catch (error) {
        next(error);
    }
};
