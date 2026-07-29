const router = require("express").Router();
const {
  createClothingItem,
  getClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

// Create clothing item (validate body)
router.post("/", validateCardBody, createClothingItem);

// Get clothing item by ID (validate params)
router.get("/:itemId", validateItemId, getClothingItem);

// Delete clothing item by ID (validate params)
router.delete("/:itemId", validateItemId, deleteClothingItem);

// Like clothing item (validate params)
router.put("/:itemId/likes", validateItemId, likeClothingItem);

// Unlike clothing item (validate params)
router.delete("/:itemId/likes", validateItemId, unlikeClothingItem);

module.exports = router;
