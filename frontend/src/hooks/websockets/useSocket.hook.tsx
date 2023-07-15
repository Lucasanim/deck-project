import React, { useEffect, useState, useMemo } from "react";
import io from "socket.io-client";

const useSocket = (url?: string) => {
  const [online, setOnline] = useState(false);

  const socket = useMemo(
    () =>
      io(url || import.meta.env.VITE_SOCKETS_BASE_URL, {
        transports: ["websocket"],
      }),
    [url]
  );

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};

export default useSocket;
