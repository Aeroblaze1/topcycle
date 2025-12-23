require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const { connectRabbit } = require("./config/rabbit");
const { Server } = require("socket.io");
const { initSockets } = require("./sockets");

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  await connectRedis();
    await connectRabbit();

  const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  initSockets(io);

  server.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

start();
