const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use((req, res, next) => {
  req.user = {
    _id: "6a04246f071f24acb42d5cf8", // Example user ID, replace with actual user ID in production
  };
  next();
});
app.use("/", mainRouter); // Use the main routes
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
