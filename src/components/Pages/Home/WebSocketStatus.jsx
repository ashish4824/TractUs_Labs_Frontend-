import { useEffect, useState } from "react";
import io from 'socket.io-client';

const WebSocketStatus = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    setSocket(socket);
    socket.on('contractUpdated', (data) => {
      setMessage(`Contract updated: ${data.contract_id}`);
    });
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-2 bg-yellow-200">
      {message && `${message}`}
    </div>
  );
};

export default WebSocketStatus;