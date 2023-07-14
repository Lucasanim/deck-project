export default interface MessagePublicModel {
  body: string;
  sender: number;
  createdAt: Date;
  deleted: boolean;
  seen: boolean;
  seenAt?: Date;
}
