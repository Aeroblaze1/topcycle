const amqp = require("amqplib");

async function connectRabbit() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue("queue.order.placed", {
    durable: true
  });

  console.log("RabbitMQ connected (Worker)");
  return channel;
}

module.exports = connectRabbit;
