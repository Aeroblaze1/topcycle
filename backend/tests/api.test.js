// MOCK FIRST (non-negotiable)
jest.mock("redis");
jest.mock("../src/config/rabbit");
jest.mock("../../shared/models/User");
jest.mock("../../shared/models/Item");

// THEN imports
const request = require("supertest");
const app = require("../src/app");

const User = require("../../shared/models/User");
const Item = require("../../shared/models/Item");

describe("API Smoke Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /items creates item", async () => {
    const mockItem = {
      _id: "mockItemId",
      farmerId: "mockFarmerId",
      name: "Potato",
      price: 20,
      quantity: 50,
    };

    Item.create.mockResolvedValue(mockItem);

    const res = await request(app).post("/items").send({
      farmerId: "mockFarmerId",
      name: "Potato",
      price: 20,
      quantity: 50,
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Potato");
    expect(Item.create).toHaveBeenCalledWith({
      farmerId: "mockFarmerId",
      name: "Potato",
      price: 20,
      quantity: 50,
    });
  });

  test("GET /items returns items", async () => {
    const mockItems = [
      {
        _id: "mockItemId",
        farmerId: "mockFarmerId",
        name: "Onion",
        price: 30,
        quantity: 40,
      },
    ];

    Item.find.mockResolvedValue(mockItems);

    const res = await request(app).get("/items");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Onion");
    expect(Item.find).toHaveBeenCalled();
  });
});

const { redisClient } = require("../src/config/redis");

describe("Redis cache behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /items uses Redis cache when available", async () => {
    redisClient.get.mockResolvedValueOnce(
      JSON.stringify([{ name: "Cached Item" }])
    );

    const res = await request(app).get("/items");

    expect(redisClient.get).toHaveBeenCalled();
    expect(res.body[0].name).toBe("Cached Item");
  });
});
