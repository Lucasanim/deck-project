import ChatModel from "../models/ChatModel";

class ChatRepository {
  static async getChatsOfUser(userId: number) {
    return await ChatModel.find({ members: userId });
  }

  static async getChatById(chatId: number) {
    return await ChatModel.findById(chatId);
  }

  static async createChat(memberIds: number[]) {
    return await ChatModel.create({ members: memberIds, messages: [] });
  }
}

export default ChatRepository;
