import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import "@fontsource/roboto/700.css";
import ChatInput from "../chatTextEditor/ChatTextEditor";
// import ChatList from "./ChatLists/ChatLists";
import ChatHeader from "../chatHeader/ChatHeader";
import ChatContainer from "../chatContainer/ChatContainer"
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

const ChatLayout = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSendClick = () => {
    console.log("message send successfully..");
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "81vh",
        width: "40vw",
        borderRadius: "14px",
        position: "absolute",
        
      }}
    >
      <ChatHeader />
      <ChatContainer
        senderName="Saravanan"
        message="Started with the design work. Forgot to update. I'll update the base for productivity framework screen once it's in good shape. 👍"
        time="12:00 PM"
      />

      <ChatInput
        icons={{
          bold: <FormatBoldIcon />,
          italic: <FormatItalicIcon />,
          underline: <FormatUnderlinedIcon />,
          remove: <RemoveSharpIcon style={{ transform: "rotate(90deg)" }} />,
          bulletList: <FormatListBulletedIcon />,
          numberList: <FormatListNumberedIcon />,
          attach: <AttachFileIcon />,
          emoji: <SentimentSatisfiedAltSharpIcon />,
          send: <SendSharpIcon />,
        }}
        placeholder="Type in your message..."
        onSendClick={handleSendClick}
        onInputChange={handleInputChange}
      />
    </Box>
  );
};

export default ChatLayout;
