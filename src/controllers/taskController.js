// Task controller - handles task related logic for routes
const Task = require('../models/taskModel');

// Get all tasks, with optional filters
const getTasks = async (req, res, next) => {
    try {
        const filters = {
            status: req.query.status,
            priority: req.query.priority,
            assignee_id: req.query.assignee_id
        };
        const tasks = await Task.findAll(filters);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get a single task by id
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404);
            throw new Error('Task not found');
        }
    } catch (error) {
        next(error);
    }
};

// Create a new task and emit event
const createTask = async (req, res, next) => {
    try {
        const taskId = await Task.create(req.body);
        const task = await Task.findById(taskId);

        // Notify clients via socket
        const io = req.app.get('socketio');
        io.emit('taskCreated', task);

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

// Update a task by id and emit event
const updateTask = async (req, res, next) => {
    try {
        const taskToUpdate = await Task.findById(req.params.id);
        if (!taskToUpdate) {
            res.status(404);
            throw new Error('Task not found');
        }

        // Merge old and new data
        const updatedData = { ...taskToUpdate, ...req.body };
        // This ensures dates are formatted correctly

        await Task.update(req.params.id, updatedData);
        const task = await Task.findById(req.params.id);

        // Notify clients via socket
        const io = req.app.get('socketio');
        io.emit('taskUpdated', task);

        res.json(task);
    } catch (error) {
        next(error);
    }
};

// Delete a task by id and emit event
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        await Task.delete(req.params.id);

        // Notify clients via socket
        const io = req.app.get('socketio');
        io.emit('taskDeleted', req.params.id);

        res.json({ message: 'Task removed' });
    } catch (error) {
        next(error);
    }
};

// Export all task controller functions
module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
