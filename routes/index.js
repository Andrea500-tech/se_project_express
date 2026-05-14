const router = require("express").Router();

const { NOT_FOUND } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use("/users", userRouter); // Use the user routes
router.use("/items", clothingItemsRouter); // Use the clothing items routes
router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});
module.exports = router;
