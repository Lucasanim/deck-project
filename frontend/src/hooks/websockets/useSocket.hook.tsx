import React, { useEffect, useState, useMemo } from "react";
import io from "socket.io-client";

const useSocket = (url: string, path?: string) => {
  const [online, setOnline] = useState(false);

  const socket = useMemo(
    () =>
      io(url, {
        transports: ["websocket"],
        path: path || "",
      }),
    [url, path]
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
