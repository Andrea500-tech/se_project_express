const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index"); // public routes
const userRouter = require("./routes/users");
const auth = require("./middlewares/auth");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Public routes (no token required)
app.use("/", mainRouter);

// Protected routes (token required)
app.use(auth);
app.use("/users", userRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
