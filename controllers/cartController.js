
const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");

// @desc Get user-specific cart
// @route GET /api/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.json({ items: [] }); // Return empty cart if not found
  }

  res.json(cart);
});

// @desc Add item to cart
// @route POST /api/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  console.log('request body details -> ' , req.body);
  let { productId, quantity ,name, price,image } = req.body;

  // // Convert productId to ObjectId
  // try {
  //   productId = new mongoose.Types.ObjectId(productId);
  // } catch (error) {
  //     res.status(400);
  //     throw new Error("Invalid productId format. Must be a valid ObjectId.");
  // }

  // Validate productId format (It should be a string, not a number)
  if (!productId || typeof productId !== "string") {
    res.status(400);
    throw new Error("Invalid productId format. Must be a valid string.");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Create new cart if none exists
    cart = new Cart({ user: req.user._id, 
                      items: [] 
                    });
    console.log("🆕 Creating New Cart for User:", req.user._id);
  }

  // Check if item already exists
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    console.log("🔄 Product Exists, Updating Quantity...");
    existingItem.quantity += quantity;
  } else {
    console.log("➕ Adding New Product to Cart");
    cart.items.push({ productId, name, price, quantity, image });
  }

  await cart.save();
  console.log("✅ Cart Updated Successfully", cart);
  res.status(201).json(cart);
});

// @desc Update cart item quantity
// @route PUT /api/cart/:itemId
// @access Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(i => i._id.toString() === itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

// @desc Remove item from cart
// @route DELETE /api/cart/:itemId
// @access Private
const removeCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i._id.toString() !== itemId);
  await cart.save();
  
  res.json(cart);
});

// @desc Clear entire cart
// @route DELETE /api/cart
// @access Private
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Cart cleared" });
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
