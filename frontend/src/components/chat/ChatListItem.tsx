import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";

const ChatListItem: React.FC = () => {
  return (
    <ListItem alignItems="flex-start" className="cursor-pointer">
      <ListItemAvatar>
        <Avatar className="m-5" sx={{ bgcolor: red[500] }} aria-label="recipe">
          UU
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="User name"
        secondary={<React.Fragment>{" Last message body…"}</React.Fragment>}
      />
    </ListItem>
  );
};

export default ChatListItem;
