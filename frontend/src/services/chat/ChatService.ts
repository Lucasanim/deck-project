import ChatModel from "../../models/chats/ChatModel";
import { GenericClient } from "../genericClient/genericClient";

const instance = new GenericClient("/chats");

export const getUserChats = () => {
  return instance.get<ChatModel[]>("/chats");
};

export const getChat = (chatId: number | string) => {
  return instance.get<ChatModel>(`/chats/${chatId}`);
};

export const createChat = (receiverId: number | string) => {
  return instance.post<ChatModel>(`/chats/${receiverId}`);
};
