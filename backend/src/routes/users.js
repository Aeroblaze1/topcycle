const express = require("express");
const User = require("../../../shared/models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, role } = req.body;

  const user = await User.create({ name, role });
  res.status(201).json(user);
});

module.exports = router;
