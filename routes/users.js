const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

// Protected routes (require JWT via auth middleware)

// GET current logged-in user
router.get("/me", getCurrentUser);

// UPDATE current logged-in user
router.patch("/me", validateUserUpdate, updateUser);

module.exports = router;
