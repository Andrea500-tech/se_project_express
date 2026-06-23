const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { NOT_FOUND } = require("../utils/errors");

// Public routes (no token required)
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getClothingItems);

// Protected routes (token required)
router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

// Global 404 handler
router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = router;
