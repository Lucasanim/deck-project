import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./ChatListItem";

const ChatsList: React.FC = () => {
  return (
    <List className="h-full overflow-scroll w-3/12">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
        <>
          <ChatListItem key={index} />
          {/* <Divider key={index + "d"} variant="inset" component="li" /> */}
        </>
      ))}
    </List>
  );
};

export default ChatsList;
