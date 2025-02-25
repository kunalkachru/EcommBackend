// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";

// // Load environment variables
// dotenv.config();


// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors()); // Enable CORS for frontend communication
// app.use(bodyParser.json()); // Parse JSON requests


// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.log("MongoDB Connection Error:", err));

// // Default route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Listen on a port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// // Load environment variables
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection


// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.error("MongoDB Connection Error:", err));

// // Test Route
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// // Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
//const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes"); // Import cart routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/auth", authRoutes);
app.use('/api/users',userRoutes)

// Register cart routes
app.use("/api/cart", cartRoutes); 


const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

