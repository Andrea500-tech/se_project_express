const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { NotFoundError } = require("../utils/errors"); // import custom error
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

// Public routes (no token required)
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login); 
router.get("/items", getClothingItems);

// Protected routes (token required)
router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

// Global 404 handler → forward to centralized error handler
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
