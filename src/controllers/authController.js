// Auth controller - handles user registration and login logic
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register a new user
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findByEmail(email);

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in DB
        const userId = await User.create(username, email, hashedPassword);
        const user = await User.findById(userId);

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// Login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findByEmail(email);

        // Check password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// Export auth controller functions
module.exports = { registerUser, loginUser };
