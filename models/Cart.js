
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  items: [
    {
      productId: { type: String, required: true, ref: "Product" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String },
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
