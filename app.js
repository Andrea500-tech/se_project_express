const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index"); // single entry point for all routes

const app = express();
app.use(cors());
app.use(express.json());

// Only one router mounted
app.use("/", mainRouter);

const { PORT = 3001 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
