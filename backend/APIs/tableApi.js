const express = require("express");
const router = express.Router();
const TableBooking = require("../models/tableBookModel");

// ✅ **Book a Table**
router.post("/book-table", async (req, res) => {
  try {
    const { email, restaurantName, tableNumber, address, date, time, numberOfGuests } = req.body;

    if (!email || !restaurantName || !tableNumber || !date || !time) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newBooking = new TableBooking({
      email: email.toLowerCase(), // Normalize email
      restaurantName,
      tableNumber,
      address,
      date,
      time,
      numberOfGuests,
    });

    await newBooking.save();
    res.status(201).json({ message: "Table booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to book table", details: error.message });
  }
});

// ✅ **Fetch Bookings by Restaurant**
router.get("/bookings", async (req, res) => {
  try {
    const { restaurantName } = req.query;
    if (!restaurantName) {
      return res.status(400).json({ error: "Restaurant name is required." });
    }

    console.log(`Fetching bookings for restaurant: ${restaurantName}`);
    const bookings = await TableBooking.find({ restaurantName });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching table bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings", details: error.message });
  }
});

// ✅ **Fetch Bookings for a Specific User by Email**
router.get("/bookings/user", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "User email is required." });
    }

    const normalizedEmail = decodeURIComponent(email).toLowerCase(); // Decode and normalize email

    console.log("Fetching bookings for user:", normalizedEmail);

    const bookings = await TableBooking.find({ email: normalizedEmail });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.status(200).json({ payload: bookings });
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings", details: error.message });
  }
});


// ✅ **Cancel a Booking**
router.delete("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await TableBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel booking", details: error.message });
  }
});
// ✅ **Fetch All Bookings**
router.get("/booking/all", async (req, res) => {
  try {
    console.log("Fetching all table bookings...");
    const bookings = await TableBooking.find({});

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching table bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings", details: error.message });
  }
});


module.exports = router;