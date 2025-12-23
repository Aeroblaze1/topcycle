const amqp = require("amqplib");

let channel;

async function connectRabbit() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();

  await channel.assertQueue("queue.order.placed", {
    durable: true
  });

  console.log("RabbitMQ connected (API)");
}

function getChannel() {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
}

module.exports = {
  connectRabbit,
  getChannel
};
