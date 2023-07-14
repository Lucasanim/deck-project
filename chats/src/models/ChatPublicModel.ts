import MessagePublicModel from "./MessagePublicModel";
import User from "./User";

export default interface ChatPublicModel {
  _id: number;
  members: number[];
  memberData?: User;
  messages: MessagePublicModel[];
  createdAt: Date;
}
