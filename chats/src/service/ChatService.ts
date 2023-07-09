import Message from "../models/Message";
import ChatRepository from "../repository/ChatRepository";

class ChatService {
  static async getChatsOfUser(userId: number) {
    return await ChatRepository.getChatsOfUser(userId);
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
