const winston = require('winston');

// Setting up the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Middleware for logging errors
const logError = (error) => {
  logger.error(error.stack);
};

// Middleware for logging warnings
const logWarning = (warning) => {
  logger.warn(warning);
};

// Middleware for logging information
const logInfo = (info) => {
  logger.info(info);
};

module.exports = { logError, logWarning, logInfo };
