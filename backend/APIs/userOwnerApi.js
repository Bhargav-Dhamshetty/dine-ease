const express = require("express");
const cors = require("cors");
const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/userOwnerModel");
const requireAuth = require("../middleware/clerkAuth"); // Ensure correct export/import

const userApp = express.Router();

// ✅ Enable CORS
userApp.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Middleware to Parse JSON
userApp.use(express.json());

// ✅ Register user (New User or Existing User with Matching Role)
userApp.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
      try {
        console.log("Received Data:", req.body);
        const { email, role } = req.body;
        if (!email || !role) {
          return res.status(400).json({ message: "Email and Role are required!" });
        }
        let userInDb = await User.findOne({ email });
        if (userInDb) {
          if (userInDb.role === role) {
            return res.status(200).json({ message: "User exists", payload: userInDb });
          } else {
            return res.status(400).json({ message: "Invalid role" });
          }
        }
        const newUser = new User(req.body);
        const newUserDoc = await newUser.save();
        return res.status(201).json({ message: "User registered successfully", payload: newUserDoc });
      } catch (error) {
        console.error("❌ Error Registering User:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
      }
    })
  );
  

// ✅ Get all users
userApp.get(
  "/users",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({ message: "Users Fetched", payload: users });
    } catch (error) {
      console.error("❌ Error Fetching Users:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

module.exports = userApp;