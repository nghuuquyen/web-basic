require('express-async-errors');
require('./configs/app');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./configs/logger');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs'); // Set view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.use(expressLayouts);
app.set('layout', 'layouts/default'); // Set default layout
app.use(express.static('public')); // Serve static files from src/public
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(morgan('combined')); // Log HTTP requests

// Register all application routes
app.use('/', routes);

// Error handler
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });

    if (res.headersSent) {
        return next(err);
    }

    if (req.xhr) {
        res.status(500).json({
            error: 'Something failed!',
            message: err.message,
        });
    } else {
        res.status(500);
        res.render('error', { error: err });
    }
});

module.exports = app;
