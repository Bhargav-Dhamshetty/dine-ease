require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

// Import API routes
const userApp = require("./APIs/userOwnerApi");
const restaurentApp = require("./APIs/restaurentApi");
const tableApp = require("./APIs/tableApi");
const odiApp=require("./APIs/orderApi")
// Middleware
app.use(express.json()); // Parse JSON data

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

// Multer Middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only JPEG, PNG, and GIF images are allowed!"), false);
  },
});

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}));

// Preflight request handling
app.options("*", cors());

// Serve Uploaded Files
app.use("/uploads", express.static(uploadDir));

// Image Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded!" });
  res.json({ message: "File uploaded successfully", filePath: `/uploads/${req.file.filename}` });
});

// Database Connection
const connectDB = async () => {
  if (!process.env.DBURL) {
    console.error("❌ Missing DBURL in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
    });

    console.log("✅ Database Connected Successfully");

    // Load Routes
    app.use("/user-api", userApp);
    app.use("/restaurent-api", restaurentApp);
    app.use("/table-api", tableApp);
    app.use("/odi-api",odiApp)

    // Handle Unknown Routes
    app.use((req, res) => res.status(404).json({ message: "Route Not Found" }));

    // Global Error Handler
    app.use((err, req, res, next) => {
      console.error("❌ Server Error:", err.message);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    });

    // Start Server
    app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();