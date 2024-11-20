import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Avatar2 from "../../assets/avatar2.jpeg";
import img from "../../assets/img.png";
import Searchbar from "../../Component/Searchbar/Searchbar";
import Img1 from "../../assets/image1.png";
import Badge from '@mui/material/Badge';
import ChatLayout from "./chatLayout/ChatLayout";

function ChatProfiles() {
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const persons = [
    { id: 1, img: Avatar2, name: "Indhu", msg: "Hello Mam, give 100 out of 100 for review...", count: 4 },
    { id: 2, img: Img1, name: "John", msg: "Hello Mam, give 100 out of 100 for review...", count: 10 },
    { id: 3, img: Avatar2, name: "Loosy", msg: "Hello Mam, give 100 out of 100 for review...", count: 2 },
    { id: 4, img: Img1, name: "Thuran", msg: "Hello Mam, give 100 out of 100 for review...", count: 14 },
    { id: 5, img: Avatar2, name: "Aadhi", msg: "Hello Mam, give 100 out of 100 for review...", count: 13 },
    { id: 6, img: Img1, name: "Kumaraguru", msg: "Hello Mam, give 100 out of 100 for review...", count: 10 },
    { id: 7, img: Avatar2, name: "Barath", msg: "Hello Mam, give 100 out of 100 for review...", count: 3 },
  ];

  const handleProfileClick = (id) => {
    setSelectedProfileId(id);
  };

  return (
    <div>
      <Box>
        <Typography
          sx={{
            fontSize: "26px",
            fontWeight: "600",
            mb: "20px",
            position: "fixed",
            top: 100,
            width: "30%",
            zIndex: 1,
            padding: "10px",
            mb:4,
            color:"#161439"
          }}
        >
          Message
        </Typography>
        <Box
          sx={{
            mt: "60px",
            padding: "10px",
            borderRadius: "10px",
            height: "90vh",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "1px 2px 6px 0px #0000001A",

              boxShadow: "0px 4px 4px 0px #00000040",
              
              padding: "20px",
              mt: "50px",
              overflowY: "auto",
              // width:"35%"
             
            }}
          >
            <Searchbar />
            <Box sx={{mt:"40px"}}>
              {persons.map((person) => (
                <Box
                  key={person.id}
                  onClick={() => handleProfileClick(person.id)}
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <Avatar alt="Profile Image" src={person.img} sx={{ mr: "10px" }} />
                  <Box flex="1" ml="10px">
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "bold" }}>{person.name}</Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        color: "#b8b4b4",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {person.msg}
                    </Typography>
                  </Box>
                  <IconButton aria-label="notifications">
                    <Badge badgeContent={person.count} sx={{ 
                      '& .MuiBadge-badge': {
                        backgroundColor: '#f2453f',
                        color: 'white',
                      },
                    }}>
                    </Badge>
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           {selectedProfileId ? (
  <Box sx={{ ml: "150px", width: "100%", height: "100%" }}>
    <ChatLayout />
  </Box>
) : (
  <>
    <img
      src={img}
      alt="placeholder"
      style={{
        height: "30%",
        width: "50%",
        alignItems:"center",
        marginLeft:"140px",
        marginBottom: "20px",
      }}
    />
    <Typography
      sx={{
        textAlign: "center",
        color: "#161439",
        fontFamily: "Poppins",
        width:"500px",
        marginLeft:"140px",
        fontSize:"14px",
      }}
    >
      Easily message with your connected alumni to get career advice,
      guidance, or mentorship. Build valuable connections that support your
      growth and future success.
    </Typography>
  </>
)}

          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ChatProfiles;
