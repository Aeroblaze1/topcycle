const User = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

module.exports = User;
