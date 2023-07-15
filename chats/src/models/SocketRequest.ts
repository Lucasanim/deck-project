import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketRequest
  extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
  userId?: string;
}

export default SocketRequest;
