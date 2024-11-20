import React, { useState } from "react";
import "./Horizantalbar.css";
import { Link } from "react-router-dom";
import { PiSuitcaseSimple } from "react-icons/pi";
import { CiGrid41 } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import Searchbar from "../Component/Searchbar/Searchbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";
import Avatar2 from "../assets/avatar2.jpeg";
import { LocationOn as LocationIcon, Work as WorkIcon } from '@mui/icons-material';
import { TbNotes } from "react-icons/tb";
import { UserContext } from "../UserContext";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
function Horizantalbar() {
  const { user, setUser } = useContext(UserContext);
 
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [searchValueJob, setSearchValueJob] = useState("");
  const [searchValueLocation, setSearchValueLocation] = useState("");

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const username = user.email ? user.email.match(/^([^.]+)/)[0] : "";  

  const capitalizeFirstLetter = (str) => {  
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);  
};  

const capitalizedUsername = capitalizeFirstLetter(username); 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="horinav">
      <div className="nav-left">
        <Box sx={{ display: "flex", flexDirection: "center",mr:"20px"}}>
          <Searchbar
            backgroundColor="#EEEEEE"
            placeholderText="Kelly Zoya"
            iconColor="black"
            width="40%"
            sx={{textAlign:"float-left",mr:"50px"}}
            inputWidth="30ch"
            value={searchValueJob}
            onChange={(e) => setSearchValueJob(e.target.value)}
          />
          <Searchbar
            backgroundColor="#EEEEEE"
            placeholderText="Bangalore"
            iconColor="black"
            width="40%"
            icon={LocationIcon}
            inputWidth="30ch"
            value={searchValueLocation}
            onChange={(e) => setSearchValueLocation(e.target.value)}
            inputProps={{
              style: {textAlign: 'center',mr:"20px" }
            }}
          />
        </Box>
      </div>
      <div className="nav-icons">
      <Link to="/">
        <CiGrid41
         onClick={() => handleIconClick('grid')} 
          style={{ fontSize: "29px", color: activeIcon === 'grid' ? "#1B4BDADB" : "#767676" }}
        />
        </Link>
        
        <Link to="/chatting">
        <RiMessage2Line
        onClick={() => handleIconClick('message')}
          style={{ fontSize: "29px", color: activeIcon === 'message' ? "#1B4BDADB" : "#767676" }}
        />
        </Link>
        <Link to="/internship-lists">
        <IoBagHandleOutline 
            onClick={() => handleIconClick('internship')}
            style={{ fontSize: "29px", color: activeIcon === 'internship' ? "#1B4BDADB" : "#767676" }}
          />
        </Link>
        <Link to="/message-forum">
        <TbNotes
        onClick={() => handleIconClick('notes')}
          style={{ fontSize: "29px", color: activeIcon === 'notes' ? "#1B4BDADB" : "#767676" }}
        />
        </Link>
        <Link to="/">
        <IoMdNotificationsOutline
        onClick={() => handleIconClick('notification')}
          style={{ fontSize: "29px", color: activeIcon === 'notification' ? "#1B4BDADB" : "#767676" }}
        />
        </Link>
        <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row",ml:"170px" }}>
          <Box display="flex" flexDirection="column">
            <Typography
              sx={{
                flexBasis: "50%",
                flexGrow: "10%",
                fontSize: "16px",
                whiteSpace: "nowrap",
                color: "#767676",
                mr: "10px",
                fontWeight: 500
              }}
            >
              {capitalizedUsername}
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#767676", textAlign:'center', fontWeight: 400}}>
             {user.role}
            </Typography>
          </Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={Avatar2} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </div>
  );
}

export default Horizantalbar;
