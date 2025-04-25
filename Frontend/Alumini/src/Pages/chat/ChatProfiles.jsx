import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar2 from "../../assets/avatar2.jpeg";
import img from "../../assets/img.png";
import Searchbar from "../../Component/Searchbar/Searchbar";
import Img1 from "../../assets/blankProfile.png";
import Badge from '@mui/material/Badge';
import ChatLayout from "../../pages/chat/chatLayout/ChatLayout";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8081");


function ChatProfiles() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [persons, setPersons] = useState([])
  const { user } = useContext(UserContext);
  const [room , setRoom] = useState(null)
  const [search, setSearch] = useState(null)
  const [filtered, setFiltered] = useState([])

  //fetches connection from backend
  useEffect(() => {
      const getConnections = async() => {
        try{
           const response = await axios.get(`http://localhost:8081/getConnections/${user.email}`)
           console.log(response.data)
           setPersons(response.data)
           setFiltered(response.data)
        } catch(error){
          console.error("Error: ", error)
        }
      }
      getConnections()

      //listening "room_created" event from backend
      socket.on("room_created", (data) => {
        if (data && data.roomID) {
            setRoom(data.roomID);  // Store the roomID received from the backend
            console.log("Room Created with ID:", data.roomID);
        }
    });

    // Cleanup socket listener on component unmount
    return () => {
        socket.off("room_created");
    };
  },[])

  const handleProfileClick = (profile) => {
      setSelectedProfile(profile);
  
      // Emit 'create_room' event to the backend with sender and receiver data
      const sender = user.id; // Replace with actual sender data (e.g., from user state or context)
      const receiver = profile.id;   // The receiver is selected profile
  
      socket.emit("create_room", { sender, receiver });

      const setNotification = async() => {
        try{
         await axios.put(`http://localhost:8081/mark/notifications/${sender}/${receiver}`)
        }
        catch(error){
          console.log("error marking notifications", error)
        }
      }
      setNotification()
  };

  const filterPersons = (searchValue) => {
    if (!searchValue) {
      // If the search value is empty, return all persons
      return persons;
    }
  
    const searchLower = searchValue.toLowerCase();
  
    return persons.filter((person) => {
      const email = person.connected_details?.email || ""; // Safely access email
      const name = person.connected_details?.name || "";  // Safely access name
  
      const emailMatch = email.toLowerCase().includes(searchLower);
      const nameMatch = name.toLowerCase().includes(searchLower);
  
      return emailMatch || nameMatch;
    });
  };

  const handleChange = (e) =>{
    setSearch(e.target.value)
  }
  

  useEffect(()=> {
    setFiltered(filterPersons(search))
  },[search])
  


  const capitalizeFirstLetter = (email) => { 
    const username = email ? email.match(/^([^.]+)/)[0] : ""; 
    if (!username) return "";
    return username.charAt(0).toUpperCase() + username.slice(1);  
}; 

  return (
   <>
    
      <div style={{backgroundColor:"#fbfbfb", overflowX:"hidden"}}>
      <Typography
          sx={{
            fontSize: "26px",
            fontWeight: "600",
            mb: "5px",          
            top: 100,
            zIndex: 1,
            padding: "10px",
            color:"#161439",
          }}
        >
          Message
        </Typography>
        <Box
          sx={{
            //mt: "60px",
            padding: "10px",
            borderRadius: "10px",
            height: "81vh",
            overflowY: "hidden",
            display: "flex",
            width:'100%',
            alignItems: "center",
            gap: "0px",
          }}
        >

          <Box
            sx={{
              height: "100%",
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow:"1px 2px 6px 0px #0000001A",

              boxShadow: "0px 4px 4px 0px #00000040",
              
              padding: "20px",
              mt: "20px",
              overflowY: "hidden",
              // width:"35%"
             
            }}
          >
            <Searchbar search={search} setSearch={setSearch} onChange={handleChange} />
            <Box sx={{mt:"40px"}}>
              {filtered.map((person) => (
                <Box
                  key={person.id}
                  onClick={() => handleProfileClick(person)}
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
                  <Avatar alt="Profile Image" src={person.connected_details.profile_image_path ?  `http://localhost:8081/${person.connected_details.profile_image_path.replace(/\\/g, "/")}`: Img1} sx={{ mr: "10px" }} />
                  <Box flex="1" ml="10px">
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "bold" }}>{person.connected_details.name ? person.connected_details.name : capitalizeFirstLetter(person.connected_details.email)}</Typography>
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
                      {person.connected_details.name? "Alumni": person.role.charAt(0).toUpperCase() + person.role.slice(1).toLowerCase()}
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
           {selectedProfile ? (
  <Box sx={{ ml: "50px", width: "100%", height: "100%", backgroundColor:"#F7F7F9",boxShadow: "1px 2px 6px 0px #0000001A",boxShadow: "0px 4px 4px 0px #00000040" }}>

    <ChatLayout person={selectedProfile} socket={socket} room={room} setSelectedProfile={setSelectedProfile} />
  </Box>
) : (
  <>
  <img
      src={img}
      width="350px"
      height="250px"
      alt="placeholder"
      style={{
        alignItems:"center",
        marginLeft:"260px",
        marginBottom: "20px",
      }}
    />
    <Typography
      sx={{
        textAlign: "center",
        color: "#161439",
        fontFamily: "Poppins",
        width:"500px",
        marginLeft:"260px",
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
      </div>
    </>

  );
}

export default ChatProfiles;
