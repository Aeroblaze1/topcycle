import { useEffect, useState } from "react";
import api from "./api";
import Notifications from "./Notifications";

export default function FarmerDashboard({ farmerId }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  async function fetchItems() {
    const res = await api.get("/items");
    const itemsData = Array.isArray(res.data) ? res.data : [];
    setItems(itemsData.filter((i) => i.farmerId === farmerId));
  }

  async function addItem() {
    await api.post("/items", {
      farmerId,
      name,
      price: Number(price),
      quantity: Number(quantity),
    });

    setName("");
    setPrice("");
    setQuantity("");
    fetchItems();
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Farmer Dashboard</h2>

      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <h3>Your Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>

      <Notifications userId={farmerId} />
    </div>
  );
}
