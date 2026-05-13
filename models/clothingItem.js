const mongoose = require("mongoose");
const validator = require("validator");
const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The clothing item name is required"],
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: [true, "Weather type is required"],
    enum: ["hot", "warm", "cold"], // only allow these values
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // links item to a user
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // array of users who liked the item
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // automatically set when created
  },
});
module.exports = mongoose.model("clothingItem", clothingItemSchema);
