const mongoose = require("../db/mongoose");


const itemSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("Item", itemSchema);
