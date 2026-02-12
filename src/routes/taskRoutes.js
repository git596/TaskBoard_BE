// Task routes - handles task related API endpoints
const express = require('express');
// Import task controller functions
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
// Middleware to protect routes
const { protect } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Validation for creating a task
const taskValidation = [
    body('title').notEmpty().withMessage('Title is required')
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

// Route for getting all tasks and creating a new task
router.route('/')
    .get(protect, getTasks)
    .post(protect, taskValidation, validate, createTask);

// Route for getting, updating, and deleting a task by id
router.route('/:id')
    .get(protect, getTaskById)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;
