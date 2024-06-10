import 'express-async-errors';
import './configs/app.js';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes.js';
import logger from './configs/logger.js';
import morgan from 'morgan';
import expressLayouts from 'express-ejs-layouts';

const app = express();

app.set('view engine', 'ejs');                      // Set view engine
app.set('views', path.join('src/views'));           // Set views directory
app.use(expressLayouts);                            // Use express-ejs-layouts
app.set('layout', 'layouts/default');               // Set default layout
app.use(express.static('public'));                  // Serve static files from src/public
app.use(bodyParser.json());                         // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(morgan('combined'));                        // Log HTTP requests

app.locals.siteName = 'Express Starter';            // Set site name

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

export default app;
