// Error middleware - handles errors and 404s
const errorHandler = (err, req, res, next) => {
    // Set status code to 500 if not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Log error details
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    // Send error response
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
    });
};

// Middleware for handling 404 not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Export error middlewares
module.exports = { errorHandler, notFound };
