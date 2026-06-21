const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// Public routes (no token required)
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", clothingItemsRouter);

// 404 handler for unmatched public routes
router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = router;
