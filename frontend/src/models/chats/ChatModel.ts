import User from "../user/User";
import MessageModel from "./MessageModel";

export default interface ChatModel {
  _id: number;
  members: number[];
  memberData?: User;
  messages: MessageModel[];
  createdAt: Date;
}
