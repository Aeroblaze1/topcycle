import { useEffect, useState } from "react";
import api from "./api";
import Notifications from "./Notifications";

export default function BuyerDashboard({ buyerId }) {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    const res = await api.get("/items");
    setItems(Array.isArray(res.data) ? res.data : []);
  }

  async function placeOrder(itemId) {
    await api.post("/orders", {
      itemId,
      buyerId,
    });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Buyer Dashboard</h2>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - ₹{item.price}
            <button onClick={() => placeOrder(item._id)}>Order</button>
          </li>
        ))}
      </ul>

      <Notifications userId={buyerId} />
    </div>
  );
}
