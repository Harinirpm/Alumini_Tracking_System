import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ChatInput from "../chatTextEditor/ChatTextEditor";
import ChatHeader from "../chatHeader/ChatHeader";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { UserContext } from "../../../UserContext";
import { useContext } from "react";
import axios from "axios";

const ChatLayout = ({ person, socket, room }) => {
  const [inputValue, setInputValue] = useState(""); // Store input value for message
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]); // Store messages
  const senderName = person.connected_details.name;
  console.log(person)

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    const namePart = str.split('.')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase() ;
};
 
// useEffect(() => {
//   const fetchChatHistory = async () => {
//       try {
//           const response = await axios(`/chat/history?sender=${user.id}&receiver=${person.id}`);
//           const data = response.data;
//           console.log(data)
//           setMessages(data); // Set the fetched messages
//       } catch (error) {
//           console.error("Error fetching chat history:", error);
//       }
//   };

//   fetchChatHistory();
// }, [user.id, person.id]);

  const handleSendClick = (e) => {
    const message = inputValue; // Get the message from the input field
    const sender = user.id; // Get the sender's ID
    const receiver = person.id; // Get the receiver's profile ID

    if (message.trim() === "") {
      console.log("Message cannot be empty");
      return;
    }

    setInputValue(null); 

    // Emit the message to the server
    socket.emit("send_message", { room, sender, receiver, message });

    // Add the message to the state as outgoing
    const newMessage = {
      sender,
      message,
      createdAt: new Date().toISOString(),
      type: "outgoing", // This is an outgoing message
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleInputChange = (e) => {
    console.log(e.target.textContent)
    setInputValue(e.target.textContent); // Update input value when the user types
  };

  useEffect(() => {  
    socket.on("chat_history", (data) => {
      setMessages(data.messages); // Set chat history when received
      console.log(data.messages)
  });

    socket.on("receive_message", (data) => {
      const { room, sender, message, createdAt } = data;
      const newMessage = {
        sender,
        message,
        createdAt,
        type: sender === user.id ? "outgoing" : "incoming", // Type: outgoing if the sender is the current user, else incoming
      };

      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chat_history");
      socket.off("receive_message"); // Clean up the listener on unmount
    };
  }, [socket, user.id]); // Only re-run this effect if `socket` or `user.id` changes

  return (
    <Box sx={{ backgroundColor: "white", height: "81vh", width: "40vw", borderRadius: "14px", position: "absolute" }}>
      <ChatHeader sender={senderName} />
      <Box sx={{ padding: "10px", maxHeight: "60vh", overflowY: "auto" }}>
        {messages.length>0 && messages.map((message, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: message.type === "outgoing" || message.sender === user.id ? "row-reverse" : "row", marginBottom: "10px" }}>
            <Box
              sx={{
                backgroundColor: message.type === "outgoing" || message.sender === user.id ? "#DCF8C6" : "#ECEFF1",
                borderRadius: "10px",
                padding: "8px 12px",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              <Box sx={{ fontSize: "14px", color: "#888" }}>{message.sender==user.id ? "You" :  senderName? senderName: capitalizeFirstLetter(person.connected_email)}</Box>
              <Box sx={{ fontSize: "16px" }}>{message.message}</Box>
              <Box sx={{ fontSize: "12px", color: "#888" }}>{message.type ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : new Date(Date.parse(message.createdat)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',  day: '2-digit', month: '2-digit', year: 'numeric'  })}</Box>
            </Box>
          </Box>
        ))}
      </Box>
      <ChatInput
         sx={{
          "& input": {
            color: "#000000", // Set text to black
            fontWeight: "bold", // Make the text bolder
          },
          "& [contentEditable=true]": {
            color: "#000000", // For contentEditable divs
            fontWeight: "bold", // Bolder text
          },
        }}
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
        onInputChange={handleInputChange} // Pass handleInputChange directly
        inputValue={inputValue} // Ensure input value is passed
      />
    </Box>
  );
};

export default ChatLayout;
