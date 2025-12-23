const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/orders", orderRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
