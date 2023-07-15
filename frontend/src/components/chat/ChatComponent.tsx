import { Card, CardContent } from "@mui/material";
import React from "react";
import MessageInput from "./message/MessageInput";
import MessageComponent from "./message/MessageComponent";
import useSocket from "../../hooks/websockets/useSocket.hook";
import ChatModel from "../../models/chats/ChatModel";

interface Props {
  selectedChat?: ChatModel;
}

const ChatComponent: React.FC<Props> = (props: Props) => {
  const handleSendMessage = (text: string) => {};
  // const { socket } = useSocket();

  return (
    <Card className="w-9/12 h-full flex flex-col">
      <CardContent className="h-5/6 flex flex-col-reverse overflow-scroll">
        {!!props.selectedChat?.messages.length &&
          [1, 2, 3, 4, 5, 6].map((e, index) => (
            <MessageComponent
              key={index}
              primary={e % 2 == 0}
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop "
              time={new Date()}
            />
          ))}
      </CardContent>
      <CardContent>
        {props.selectedChat && <MessageInput handleSend={handleSendMessage} />}
      </CardContent>
    </Card>
  );
};

export default ChatComponent;
