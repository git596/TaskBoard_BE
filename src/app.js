const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('TaskBoard API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
