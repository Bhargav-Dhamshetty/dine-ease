const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  profileImageUrl: { type: String, default: "" },
  address: { type: String, default: "" },
  mobile: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;