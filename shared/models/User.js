const mongoose = require("../db/mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ["farmer", "buyer"]
  }
});

module.exports = mongoose.model("User", userSchema);
