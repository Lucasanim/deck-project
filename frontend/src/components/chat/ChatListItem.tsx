import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";
import ChatModel from "../../models/chats/ChatModel";

interface Props {
  chat: ChatModel;
}

const ChatListItem: React.FC<Props> = (props: Props) => {
  return (
    <ListItem alignItems="flex-start" className="cursor-pointer">
      <ListItemAvatar>
        <Avatar className="m-5" sx={{ bgcolor: red[500] }} aria-label="recipe">
          {props.chat.memberData?.username.slice(0, 2)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.chat.memberData?.username}
        secondary={
          <React.Fragment>
            {props.chat.messages.length
              ? props.chat.messages[0].body
              : " Last message body…"}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default ChatListItem;
