import { Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { StoreData } from "../../../redux/store/Store";

interface Props {
  handleSend: (text: string) => void;
}

const MessageInput: React.FC<Props> = (props: Props) => {
  const darkMode = useSelector(
    (store: StoreData) => store.session.sessionData.darkMode
  );
  const [text, setText] = useState("");

  function handleSend() {
    if (text) {
      props.handleSend(text);
      setText("");
    }
  }

  return (
    <div className="flex">
      <InputEmoji
        value={text}
        onChange={setText}
        onEnter={handleSend}
        placeholder="Type a message"
        theme={darkMode ? "dark" : "light"}
      />
      <Button onClick={handleSend} disabled={!text}>
        <Send />
      </Button>
    </div>
  );
};

export default MessageInput;
