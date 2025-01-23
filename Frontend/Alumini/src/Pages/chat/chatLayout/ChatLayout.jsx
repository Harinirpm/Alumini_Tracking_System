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
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Img1 from '../../../assets/blankProfile.png'


const ChatLayout = ({ person, socket, room, setSelectedProfile }) => {
  const [inputValue, setInputValue] = useState(""); // Store input value for message
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]); // Store messages
  const [name, setName] = useState("")
  const [img, setImg] = useState("")

  const fetchName = async () => {
    if (user.role === 'alumni') {
      const response = await axios.get(`http://localhost:8081/alumini/name/${user.id}`)
      setName(response.data.name)
      setImg(response.data.profile_image_path)
    }
  }
  fetchName()


  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    const namePart = str.split('.')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
  };

  const senderName = person.role === 'alumni' ? person.connected_details.name : capitalizeFirstLetter(person.connected_details.email);
  const profile_image = person.role === 'alumni' ? person.connected_details.profile_image_path : null;

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
    <Box sx={{ height: "81vh", width: "55vw", borderRadius: "2px", }}>
      <ChatHeader sender={senderName} img={profile_image} setSelectedProfile={setSelectedProfile} />
      <Box sx={{
        padding: "20px", maxHeight: "62vh", overflowY: "auto", scrollbarWidth: "none", // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
        '&-ms-overflow-style:': {
          display: 'none', // Hide the scrollbar for IE
        },
        height: "90%"
      }}>
        {messages.length > 0 && messages.map((message, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: message.type === "outgoing" || message.sender === user.id ? "row-reverse" : "row", marginBottom: "10px" }}>
            <Box sx={{display:'flex'}}>
              {console.log()}
              <Avatar 
    alt="Profile Image" 
    src={
        message.sender === user.id 
            ? (user.role === 'alumni' && img
                ? `http://localhost:8081/${img.replace(/\\/g, "/")}` 
                : Img1)
            : (person.role === 'alumni' && profile_image
                ? `http://localhost:8081/${profile_image.replace(/\\/g, "/")}` 
                : Img1)
    } 
    sx={{ mr: "10px", ml: "10px" }} 
/>

              <Box
                sx={{
                  backgroundColor: message.type === "outgoing" || message.sender === user.id ? "#3B64DF14" : "#FFFFFF",
                  borderRadius: "5px",
                  padding: "9px 18px",
                  width: "230px",
                  wordWrap: "break-word",
                }}
              >

                <Box sx={{ fontSize: "14px", color: "#424151", mb: "4px" }}>{message.sender == user.id ? "You" : senderName ? senderName : capitalizeFirstLetter(person.connected_email)}</Box>
                <Box sx={{ fontSize: "14px", color: "#6D6C80" }}>{message.message}</Box>
                <Box sx={{ fontSize: "11px", color: "#6D6C80", mt: "4px", display: "flex", justifyContent: "end" }}>{message.type ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(Date.parse(message.createdat)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Box>
                {/* <Box sx={{ fontSize: "10px", color: "#6D6C80",mt:"4px" }}>{message.type ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : new Date(Date.parse(message.createdat)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</Box> */}
              </Box>
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
          // bold: <FormatBoldIcon />,
          // italic: <FormatItalicIcon />,
          // underline: <FormatUnderlinedIcon />,
          // remove: <RemoveSharpIcon style={{ transform: "rotate(90deg)" }} />,
          // bulletList: <FormatListBulletedIcon />,
          // numberList: <FormatListNumberedIcon />,
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
