const router = require("express").Router();
const { getUsers, getCurrentUser,updateUser } = require("../controllers/users");

// Protected routes (require JWT via auth middleware)

// GET all users
router.get("/", getUsers);

// GET current logged-in user
router.get("/me", getCurrentUser);

// UPDATE current logged-in user
router.patch("/me", updateUser);

module.exports = router;
