import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./ChatListItem";
import ChatModel from "../../models/chats/ChatModel";

interface Props {
  chats: ChatModel[];
  onClick: (chat: ChatModel) => void;
}

const ChatsList: React.FC<Props> = (props: Props) => {
  return (
    <List className="h-full overflow-scroll w-3/12">
      {props.chats?.map((chat, index) => (
        <>
          <ChatListItem key={index} chat={chat} onClick={props.onClick} />
          <Divider key={index + "d"} variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};

export default ChatsList;
