import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import { verifyToken } from "../utils/jwt/jwtUtils";
import { logger } from "../utils/logger/Logger";
import SocketRequest from "../models/SocketRequest";
import { ExtendedError } from "socket.io/dist/namespace";

const SocketsAuthMiddleware = (
  socket: SocketRequest,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    let authToken = socket.handshake.auth.token;

    if (!authToken) {
      throw new Error("Unauthorized");
    }

    if (authToken.includes("Bearer ")) {
      authToken = authToken.split("Bearer ")[1];
    }

    const { sub } = verifyToken(authToken) as JwtPayload;

    socket.userId = sub;
    next();
  } catch (error) {
    logger.error(error);
    const err = new Error("unauthorized");
    next(err);
  }
};
export default SocketsAuthMiddleware;
