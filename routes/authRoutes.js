// const express = require("express");
// // Import User Model
// const User = require("../models/User");

// // For password hashing
// const bcrypt = require("bcryptjs");

// // For authentication tokens
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // User Registration Route
// router.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "User already exists" });

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // User Login Route
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT
//         const token = jwt.sign({ userId: user._id }, 
//                                 process.env.JWT_SECRET, 
//                                { expiresIn: "7d" });

//         res.json({ token, userId: user._id, name: user.name, email: user.email });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// module.exports = router;
