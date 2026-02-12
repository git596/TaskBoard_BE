// Task model - handles task database operations
const { pool } = require('../config/db');

const Task = {
    // Create a new task
    create: async ({ title, description, status, priority, due_date, assignee_id }) => {
        const query = `
            INSERT INTO tasks (title, description, status, priority, due_date, assignee_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [
            title, description, status || 'Todo', priority || 'Medium', due_date, assignee_id
        ]);
        return result.insertId;
    },

    // Get all tasks, with optional filters
    findAll: async (filters = {}) => {
        let query = 'SELECT t.*, u.username as assignee_name FROM tasks t LEFT JOIN users u ON t.assignee_id = u.id WHERE 1=1';
        const params = [];

        // Add filters if provided
        if (filters.status) {
            query += ' AND t.status = ?';
            params.push(filters.status);
        }
        if (filters.assignee_id) {
            query += ' AND t.assignee_id = ?';
            params.push(filters.assignee_id);
        }
        if (filters.priority) {
            query += ' AND t.priority = ?';
            params.push(filters.priority);
        }

        query += ' ORDER BY t.created_at DESC';

        const [rows] = await pool.execute(query, params);
        return rows;
    },

    // Find task by id
    findById: async (id) => {
        const query = 'SELECT t.*, u.username as assignee_name FROM tasks t LEFT JOIN users u ON t.assignee_id = u.id WHERE t.id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    // Update task by id
    update: async (id, { title, description, status, priority, due_date, assignee_id }) => {
        const query = `
            UPDATE tasks 
            SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, assignee_id = ? 
            WHERE id = ?
        `;
        const [result] = await pool.execute(query, [
            title, description, status, priority, due_date, assignee_id, id
        ]);
        return result.affectedRows;
    },

    // Delete task by id
    delete: async (id) => {
        const query = 'DELETE FROM tasks WHERE id = ?';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows;
    }
};

// Export the Task model
module.exports = Task;
