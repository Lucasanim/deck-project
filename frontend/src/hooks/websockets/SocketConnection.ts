import { Socket, io } from "socket.io-client";
import { store } from "../../redux/store/Store";

class SocketConnection {
  private static socket: Socket;

  public static getInstance() {
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_SOCKETS_BASE_URL, {
        transports: ["websocket"],
        auth: {
          token: store.getState().auth?.token?.accessToken,
        },
      });

      this.socket.on("connect_error", (err) => {
        console.log(err.message);
      });
    }

    return this.socket;
  }

  public static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketConnection;
