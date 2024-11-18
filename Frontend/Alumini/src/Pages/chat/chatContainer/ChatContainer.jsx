import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar2 from "../../../assets/avatar2.jpeg";
import PropTypes from "prop-types";

const ChatContainer = ({ senderName, message, time }) => {
  function SenderChat({ senderName, message, time }) {
    return (
      <Box
        display="flex" 
        sx={{ mt: "10px", flexDirection: "column", alignItems: "flex-start" }}
      >
        <Box display="flex" alignItems="center" mb="5px">
          <img
            src={Avatar2}
            alt="Sender Avatar"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              marginLeft: "10px",
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1, ml: 2,  fontFamily:"Poppins" }}>
            {senderName}
          </Typography>
          <Typography variant="caption" sx={{ color: "#999", mr: 1,  fontFamily:"Poppins" }}>
            {time}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            backgroundColor: "#f2f2f2",
            borderRadius: "15px 15px 15px 15px",
            padding: "10px",
            maxWidth: "60%",
            wordWrap: "break-word",
            color: "#5e5d5d",
            ml: 8,
             fontFamily:"Poppins"
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        fontFamily:"Poppins"
      }}
    >
      <SenderChat senderName={senderName} message={message} time={time} />
    </Box>
  );
};

ChatContainer.propTypes = {
  senderName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ChatContainer;
