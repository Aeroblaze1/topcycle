import { useEffect, useState } from "react";
import { connectSocket } from "./socket";

export default function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = connectSocket(userId);

    socket.on("ORDER_PLACED", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => socket.disconnect();
  }, [userId]);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
