require("dotenv").config();
const mongoose = require("mongoose");
const connectRabbit = require("./rabbit");


const { io } = require("socket.io-client");

const socket = io(process.env.BACKEND_SOCKET_URL, {
  query: { userId: "worker" }
});



async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Worker connected to MongoDB");
  

  //require models after connection
  const Item = require("../shared/models/Item");
const Notification = require("../shared/models/Notification");

  const channel = await connectRabbit();

channel.consume("queue.order.placed", async (msg) => {
  if (!msg) return;

  const event = JSON.parse(msg.content.toString());
  const { itemId, buyerId } = event;

  const item = await Item.findById(itemId);

  const buyerMessage = `Order placed for ${item.name}`;
  const farmerMessage = `New order received for ${item.name}`;

  await Notification.create({
    userId: buyerId,
    message: buyerMessage
  });

  await Notification.create({
    userId: item.farmerId,
    message: farmerMessage
  });

  socket.emit("notify", {
    buyerId,
    farmerId: item.farmerId,
    buyerMessage,
    farmerMessage
  });

  channel.ack(msg);
});


  console.log("Worker listening for order events");
}

start();
