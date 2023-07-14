import ChatPublicModel from "../models/ChatPublicModel";
import Message from "../models/Message";
import ChatRepository from "../repository/ChatRepository";
import UserService from "./UserService";

class ChatService {
  static async getChatsOfUser(userId: number) {
    return await ChatRepository.getChatsOfUser(userId);
  }

  static async getChatsWithUsers(userId: string, authToken: string) {
    const chats = await ChatService.getChatsOfUser(Number(userId));

    if (!chats.length) return [];

    const chatIdToUserId = new Map();

    chats.forEach((chat) => {
      chatIdToUserId.set(
        chat._id,
        chat.members.find((member) => member.toString() != userId)
      );
    });

    const userIds = chatIdToUserId.values();
    const usersData = await UserService.getUsersInformation(
      [...userIds],
      authToken
    );
    const usersMap = new Map(usersData.map((user) => [user.id, user]));

    const publicChats: ChatPublicModel[] = chats.map((chat) => {
      const userId = chatIdToUserId.get(chat._id);
      return {
        _id: chat.id,
        members: chat.members,
        messages: chat.messages,
        createdAt: chat.createdAt,
        memberData: userId ? usersMap.get(userId) : undefined,
      };
    });

    return publicChats;
  }

  static async getChatById(chatId: number) {
    return await ChatRepository.getChatById(chatId);
  }

  static async createChat(memberIds: number[]) {
    return await ChatRepository.createChat(memberIds);
  }

  static async createMessage(chatId: number, message: Message) {
    const chat = await this.getChatById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }
    chat.messages.push(message);
    chat.save();
  }
}

export default ChatService;
