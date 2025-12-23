const express = require("express");
const Order = require("../../../shared/models/Order");

const { getChannel } = require("../config/rabbit");

const router = express.Router();

router.post("/", async (req, res) => {
  const { itemId, buyerId } = req.body;

  const order = await Order.create({
    itemId,
    buyerId
  });

  const channel = getChannel();

  const event = {
    orderId: order._id,
    itemId,
    buyerId
  };
   channel.sendToQueue(
    "queue.order.placed",
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );

  res.status(201).json(order);
});

module.exports = router;
