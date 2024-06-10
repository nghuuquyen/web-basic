require('express-async-errors');

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./libs/logger');
const expressLayouts = require('express-ejs-layouts');

dotenv.config();

const app = express();

app.set('view engine', 'ejs'); // Set view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.use(expressLayouts);
app.set('layout', 'layouts/default'); // Set default layout
app.use(express.static('src/public')); // Serve static files from src/public
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

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
