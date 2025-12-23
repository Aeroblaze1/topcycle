const sendToQueue = jest.fn();

const mockChannel = {
  sendToQueue,
};

module.exports = {
  getChannel: jest.fn(() => mockChannel),
  connectRabbit: jest.fn(),
};
