const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Restaurant = require('../Models/restaurentModel');
const requireAuth = require('../middleware/clerkAuth'); // Clerk Middleware

const restaurantApp = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store files in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
});

const upload = multer({ storage: storage });

// ✅ Add new restaurant (Authenticated)
restaurantApp.post("/details", requireAuth, upload.fields([
    { name: 'imagesLink', maxCount: 5 },
    { name: 'menuImage', maxCount: 5 }
]), expressAsyncHandler(async (req, res) => {
    try {
        console.log("Authenticated User:", req.auth); // Debug Clerk Authentication
        console.log("Incoming Request Data:", req.body);
        console.log("Uploaded Files:", req.files);

        const resDet = req.body;
        resDet.latitude = parseFloat(resDet.latitude);
        resDet.longitude = parseFloat(resDet.longitude);
        resDet.totalTables = parseInt(resDet.totalTables);

        if (!resDet.name || !resDet.description || !resDet.location) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const imagesLink = req.files['imagesLink'] ? req.files['imagesLink'].map(file => file.path) : [];
        const menuImage = req.files['menuImage'] ? req.files['menuImage'].map(file => file.path) : [];

        const newRestaurant = new Restaurant({
            ...resDet,
            imagesLink,
            menuImage
        });
        
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json({ message: "Restaurant Added", payload: savedRestaurant });
    } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).json({ message: "Failed to add restaurant", error: error.message });
    }
}));

// ✅ Get all restaurants (Public)
restaurantApp.get("/all", expressAsyncHandler(async (req, res) => {
    try {
        const allRestaurants = await Restaurant.find();
        res.status(200).json({ message: "All Restaurants", payload: allRestaurants });
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
}));

// ✅ Search restaurants by name (Public)
restaurantApp.get("/search", expressAsyncHandler(async (req, res) => {
    try {
        const searchTerm = req.query.name;
        if (!searchTerm) {
            return res.status(400).json({ message: "Please provide a restaurant name to search." });
        }

        const foundRestaurants = await Restaurant.find({
            name: { $regex: searchTerm, $options: 'i' }
        });

        if (!foundRestaurants.length) {
            return res.status(404).json({ message: "No restaurants found matching your search." });
        }

        res.status(200).json({ message: "Restaurants Found", payload: foundRestaurants });
    } catch (error) {
        res.status(500).json({ message: "Error searching restaurants", error: error.message });
    }
}));

// ✅ Add a review (Authenticated)
restaurantApp.post("/review/:name", requireAuth, expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.params;
        const { review } = req.body;

        if (!review) {
            return res.status(400).json({ message: "Review text is required." });
        }

        const restaurant = await Restaurant.findOne({ name });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }

        restaurant.reviews = restaurant.reviews || [];
        restaurant.reviews.push(review);
        await restaurant.save();

        res.status(200).json({ message: "Review Added", payload: restaurant });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
}));

// ✅ Update table availability (Authenticated)
restaurantApp.patch("/update-tables/:name", requireAuth, expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.params;
        const { totalTables, tablesAvailable } = req.body;

        if (totalTables === undefined && tablesAvailable === undefined) {
            return res.status(400).json({ message: "Please provide totalTables or tablesAvailable to update." });
        }

        const restaurant = await Restaurant.findOne({ name });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }

        if (totalTables !== undefined) restaurant.totalTables = totalTables;
        if (tablesAvailable !== undefined) restaurant.tablesAvailable = tablesAvailable;

        await restaurant.save();

        res.status(200).json({ message: "Tables updated successfully", payload: restaurant });
    } catch (error) {
        res.status(500).json({ message: "Error updating tables", error: error.message });
    }
}));

module.exports = restaurantApp;