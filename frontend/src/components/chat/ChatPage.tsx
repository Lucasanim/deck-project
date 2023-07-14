import React, { useEffect, useState } from "react";
import ChatsList from "./ChatsList";
import ChatComponent from "./ChatComponent";
import ChatModel from "../../models/chats/ChatModel";
import { getUserChats } from "../../services/chat/ChatService";
import { useSelector } from "react-redux";
import { StoreData } from "../../redux/store/Store";

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<ChatModel[]>([]);
  const user = useSelector((store: StoreData) => store.auth.user);

  const requestUserChats = async () => {
    try {
      const response = await getUserChats();
      setChats(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    requestUserChats();
  }, []);

  return (
    <div className="w-full px-20 flex h-5/6">
      <ChatsList chats={chats} />
      <ChatComponent />
    </div>
  );
};

export default ChatPage;
