// Auth middleware - checks JWT and user
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check for Bearer token in header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    // No token found
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

// Export protect middleware
module.exports = { protect };
