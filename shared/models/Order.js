const mongoose = require("../db/mongoose");

const orderSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: "PLACED"
  }
});

module.exports = mongoose.model("Order", orderSchema);
