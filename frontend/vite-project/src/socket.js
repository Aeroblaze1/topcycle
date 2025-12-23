import { io } from "socket.io-client";

export function connectSocket(userId) {
  return io(import.meta.env.VITE_API_URL, {
    query: { userId }
  });
}
