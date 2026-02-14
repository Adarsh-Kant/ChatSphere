const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || 'http://localhost:5002';

import { useEffect, useState, useContext, createContext } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthProvider";
const socketContext = createContext();
export const useSocketContext = () => {
  return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatsphereoriginal.onrender.com", {
        query: { userId: authUser.user._id },
      });
      setSocket(socket);
      socket.on("getOnline", (users) => {
        setOnlineUsers(users);
      });
      
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
export default socketContext;
