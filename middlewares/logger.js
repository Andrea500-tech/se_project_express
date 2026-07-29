// Importing the necessary logging libraries
const winston = require("winston"); // Winston is the core logging library
const expressWinston = require("express-winston"); // express-winston integrates Winston with Express

// Define a custom format for console logs
const messageFormat = winston.format.combine(
  winston.format.timestamp(), // Adds a timestamp to each log entry
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      // Format: timestamp + log level + either error stack trace or message
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

// Request Logger: logs all incoming requests to the server
const requestLogger = expressWinston.logger({
  transports: [
    // Log requests to the console using the custom format
    new winston.transports.Console({ format: messageFormat }),
    // Log requests to a file in JSON format (structured, detailed)
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

// Error Logger: logs errors that occur during request handling
const errorLogger = expressWinston.errorLogger({
  transports: [
    // Log errors to the console using the custom format
    new winston.transports.Console({ format: messageFormat }),
    // Log errors to a separate file in JSON format
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
