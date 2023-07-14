export default interface MessageModel {
  body: string;
  sender: number;
  createdAt: Date;
  deleted: boolean;
  seen: boolean;
  seenAt?: Date;
}
