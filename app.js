// Load environment variables from .env
require("dotenv").config();

// Import core dependencies
const express = require("express"); // Express framework for building APIs
const mongoose = require("mongoose"); // Mongoose for MongoDB connection
const cors = require("cors"); // CORS middleware to allow cross-origin requests
const { errors } = require("celebrate"); // Celebrate middleware for request validation

// Import routes and custom error handler
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler"); // Centralized error handler

// Import loggers (request + error)
const { requestLogger, errorLogger } = require("./middlewares/logger");

// Initialize Express app
const app = express();

// Enable CORS (so frontend can talk to backend from a different domain/port)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Request logger BEFORE routes (logs all incoming requests)
app.use(requestLogger);
// Crash test route to simulate server crash for testing purposes
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
// Mount all routes under "/"
app.use("/", mainRouter);

// Error logger AFTER routes (logs errors thrown in routes)
app.use(errorLogger);

// Celebrate error handler (handles Joi/Celebrate validation errors specifically)
app.use(errors());

// Centralized error handler (handles all other errors)
app.use(errorHandler);

// Define server port and MongoDB URL from environment variables
const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

// Connect to MongoDB database
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" Error connecting to MongoDB:", err));

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
