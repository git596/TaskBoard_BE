// Auth routes - handles user authentication endpoints
const express = require('express');
// Import auth controller functions
const { registerUser, loginUser } = require('../controllers/authController');
// For validating request bodies
const { body } = require('express-validator');
// Middleware to protect routes
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Validation for user registration
const registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation for user login
const loginValidation = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required')
];

// Checks validation errors and sends response if any
const validate = (req, res, next) => {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Register, login, and get current user routes
router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
router.get('/me', protect, (req, res) => {
    res.json(req.user);
});

module.exports = router;
