const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");

// Public routes (no token required)
router.post("/signup", createUser);
router.post("/signin", login);

// Public GET /items (no auth required)
router.get("/items", getClothingItems);

// handler for unmatched public routes
router.use((req, res, next) => {
  next(); // pass control to auth, protected routers, or global 404
});

module.exports = router;
