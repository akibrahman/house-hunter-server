const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  profilePicture: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  phone: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
