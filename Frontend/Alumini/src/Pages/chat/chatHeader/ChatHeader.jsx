import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
// import Avatar1 from "../../../assets/avatar1.png";
import Avatar2 from "../../../assets/avatar2.jpeg";
import Divider from "@mui/material/Divider";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Img1 from '../../../assets/blankProfile.png'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const IconWithText = ({ icon, text }) => {
  return (
    <Box display="flex" flexDirection="row" gap={2} alignItems="center">
      {icon}
      <Typography sx={{ fontFamily: "Poppins" }}>{text}</Typography>
    </Box>
  );
};

const GroupAvatars = () => {
  return (
    <AvatarGroup
      max={3}
      sx={{
        "& .MuiAvatar-root": {
          width: 24,
          height: 24,
          fontSize: 12,
          backgroundColor: "black",
        },
      }}
    >
      <Avatar alt="Remy Sharp" src={Avatar2} />
      <Avatar alt="Travis Howard" src={Avatar2} />
      <Avatar alt="Cindy Baker" src={Avatar2} />
      <Avatar alt="Agnes Walker" src={Avatar2} />
    </AvatarGroup>
  );
};

const ChatHeader = ({sender, img, setSelectedProfile}) => {
  const handleClick = ( ) => { setSelectedProfile(null)}
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", padding: "10px" }}
      >
        <Box sx={{ ml: "5px", display:'flex', alignItems:'center' }}>
        <KeyboardBackspaceOutlinedIcon sx={{fontSize: "28px", mr:"8px", cursor:"pointer"}} onClick={() => handleClick()} />
        <Avatar alt="Profile Image" src={img ?  `https://alumini-tracking-system.onrender.com/${img.replace(/\\/g, "/")}`: Img1} sx={{ mr: "10px" }} />
     {sender}
        </Box>
        <Box sx={{ mr: "20px" }}>
       <ChatBubbleOutlineIcon />
        </Box>
      </Box>
      <Divider sx={{ width: "100%", height: "1px", mt: 0 }} />
    </Box>
  );
};

export default ChatHeader;
