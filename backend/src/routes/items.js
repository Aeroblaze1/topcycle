const express = require("express");
const Item = require("../../../shared/models/Item");
const { redisClient } = require("../config/redis");

const router = express.Router();

const ITEMS_CACHE_KEY = "items:all";
const CACHE_TTL = 60;

router.post("/", async (req, res) => {
  const { farmerId, name, price, quantity } = req.body;

  const item = await Item.create({
    farmerId,
    name,
    price,
    quantity
  });

  await redisClient.del(ITEMS_CACHE_KEY);

  res.status(201).json(item);
});


router.get("/", async (req, res) => {
  const cachedItems = await redisClient.get(ITEMS_CACHE_KEY);

  if (cachedItems) {
    return res.json(JSON.parse(cachedItems));
  }

  const items = await Item.find();

  await redisClient.setEx(
    ITEMS_CACHE_KEY,
    CACHE_TTL,
    JSON.stringify(items)
  );

  res.json(items);
});


module.exports = router;
