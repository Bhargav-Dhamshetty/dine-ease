const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const Restaurent=require('../models/restaurentModel')
const restaurentApp=exp.Router()


restaurentApp.post("/details", expressAsyncHandler(async (req, res) => {
    try {
        const newRestaurant = new Restaurent(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json({ message: "Restaurant added successfully", payload: savedRestaurant });
    } catch (error) {
        res.status(400).json({ message: "Failed to add restaurant", error: error.message });
    }
}));

// Get all restaurants
restaurentApp.get("/all", expressAsyncHandler(async (req, res) => {
    const restaurants = await Restaurent.find().select('-__v');
    res.status(200).json({ message: "All Restaurants", payload: restaurants });
}));

// Search restaurants by name
restaurentApp.get("/search", expressAsyncHandler(async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Please provide a restaurant name to search" });
    }

    const foundRestaurants = await Restaurent.find({
        name: { $regex: name, $options: 'i' }
    }).select('-__v');

    if (foundRestaurants.length) {
        res.status(200).json({ message: "Restaurants found", payload: foundRestaurants });
    } else {
        res.status(404).json({ message: "No restaurants match your search" });
    }
}));

// Add a review to a restaurant
restaurentApp.post("/review/:name", expressAsyncHandler(async (req, res) => {
    const { name } = req.params;
    const { review } = req.body;

    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }

    const restaurant = await Restaurent.findOne({ name });

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.review.push(review);
    await restaurant.save();
    
    res.status(200).json({ message: "Review added successfully", payload: restaurant });
}));

// Update table availability
restaurentApp.patch("/update-tables/:restaurantId", expressAsyncHandler(async (req, res) => {
    const { restaurantId } = req.params;
    const { totalTables, tablesAvailable } = req.body;

    if (totalTables === undefined && tablesAvailable === undefined) {
        return res.status(400).json({ message: "Provide totalTables or tablesAvailable to update" });
    }

    const restaurant = await Restaurent.findById(restaurantId);

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    if (totalTables !== undefined) restaurant.totalTables = totalTables;
    if (tablesAvailable !== undefined) restaurant.tablesAvailable = tablesAvailable;

    await restaurant.save();

    res.status(200).json({ message: "Table data updated successfully", payload: restaurant });
}));



module.exports = restaurentApp;