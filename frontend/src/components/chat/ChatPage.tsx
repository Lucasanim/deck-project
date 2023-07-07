import React from "react";
import ChatsList from "./ChatsList";
import ChatComponent from "./ChatComponent";

const ChatPage: React.FC = () => {
  return (
    <div className="w-full px-20 flex h-5/6">
      <ChatsList />
      <ChatComponent />
    </div>
  );
};

export default ChatPage;
