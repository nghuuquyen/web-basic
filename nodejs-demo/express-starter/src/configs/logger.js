const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${message} - ${stack}`;
        }),
    ),
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
    ],
});

// Log to console in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

module.exports = logger;
