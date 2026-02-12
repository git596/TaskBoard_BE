// Database config - sets up MySQL connection pool
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use promise-based pool for async/await
const promisePool = pool.promise();

// Test the database connection
const testConnection = async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

// Export the pool and test function
module.exports = {
    pool: promisePool,
    testConnection
};
