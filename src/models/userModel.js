// User model - handles user database operations
const { pool } = require('../config/db');

const User = {
    // Create a new user
    create: async (username, email, password) => {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [username, email, password]);
        return result.insertId;
    },

    // Find user by email
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    },

    // Find user by id (returns basic info)
    findById: async (id) => {
        const query = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }
};

// Export the User model
module.exports = User;
