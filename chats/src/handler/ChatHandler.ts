import SocketIo, { Server, Socket } from "socket.io";
import http from "http";
import { logger } from "../utils/logger/Logger";
import Message from "../models/Message";
import ChatService from "../service/ChatService";
import AuthMiddleware from "../middleware/AuthMiddleware";
import SocketsAuthMiddleware from "../middleware/SocketsAuthMiddleware";

class ChatHandler {
  private socket: Server;
  private static staticInstance: ChatHandler;
  private clientsMap: Map<string, Socket>;

  constructor(server?: http.Server) {
    this.clientsMap = new Map<string, Socket>();
    this.socket = new SocketIo.Server(server);
  }

  public static getInstance(server?: http.Server): ChatHandler {
    if (ChatHandler.staticInstance == null) {
      ChatHandler.staticInstance = new ChatHandler(server);
    }
    return ChatHandler.staticInstance;
  }

  public initializeWebSocket(server: http.Server) {
    try {
      this.socket = new SocketIo.Server(server);
      this.socket.use(SocketsAuthMiddleware);
      this.socket.on("connection", this.initializeConnections.bind(this));
    } catch (e) {
      logger.error("Error creating socket connection", e);
    }
  }

  private initializeConnections(socket: Socket) {
    logger.info("Started connection with ID: " + socket.id);
    socket.on("error", (error) => {
      logger.error("Error on websocket connection: " + JSON.stringify(error));
      this.handleConnectionClose(socket.id);
    });
    socket.on("message", (message: Message) => {
      this.handleMessageEvent(message);
    });
    socket.on("close", () => {
      this.handleConnectionClose(socket.id);
    });
    this.clientsMap.set(socket.id, socket);
  }

  private handleMessageEvent(message: Message) {}

  private handleConnectionClose(id: string) {
    if (this.clientsMap && this.clientsMap.has(id)) {
      this.clientsMap.delete(id);
    }
  }
}

export default ChatHandler;
