interface Message {
  body: string;
  sender: number;
  createdAt: Date;
  deleted: boolean;
  seen: boolean;
  seenAt?: Date | undefined;
}

export default Message;
