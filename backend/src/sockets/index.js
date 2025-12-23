const socketMap = new Map();

function initSockets(io) {


  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (!userId) {
      socket.disconnect();
      return;
    }

    socketMap.set(userId, socket);

     // ONLY the worker emits this
    socket.on("notify", (data) => {
      const { buyerId, farmerId, buyerMessage, farmerMessage } = data;

      const buyerSocket = socketMap.get(buyerId);
      if (buyerSocket) {
        buyerSocket.emit("ORDER_PLACED", {
          message: buyerMessage
        });
      }

      const farmerSocket = socketMap.get(farmerId);
      if (farmerSocket) {
        farmerSocket.emit("ORDER_PLACED", {
          message: farmerMessage
        });
      }
    });


    socket.on("disconnect", () => {
      socketMap.delete(userId);
    });
  });
}

function emitToUser(userId, event, payload) {
  const socket = socketMap.get(userId);
  if (socket) {
    socket.emit(event, payload);
  }
}

module.exports = {
  initSockets,
  emitToUser
};
