const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  getClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.get("/:itemId", getClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId/likes", likeClothingItem);
router.delete("/:itemId/likes", unlikeClothingItem);
module.exports = router;
