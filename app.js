const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index"); // public routes: /signup, /signin, GET /items
const userRouter = require("./routes/users"); // protected routes
const clothingItemsRouter = require("./routes/clothingItems"); // protected routes
const auth = require("./middlewares/auth");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

//  Public routes (no token required)
app.use("/", mainRouter);

//  Protected routes (token required)
app.use(auth);
app.use("/users", userRouter);
app.use("/items", clothingItemsRouter);

// Global 404 handler after all routers
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
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
