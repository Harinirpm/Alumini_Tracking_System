import React, { useState, useEffect } from "react";
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
import { Box, Divider, Popover } from "@mui/material";
import Avatar2 from "../assets/blankProfile.png";
import { LocationOn as LocationIcon, Work as WorkIcon } from '@mui/icons-material';
import { TbNotes } from "react-icons/tb";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Job from '../../src/assets/job.png'
import JobSelect from '../../src/assets/jobSelect.png'
import Threads from '../../src/assets/thread.png'
import ThreadSelect from '../../src/assets/threadsel.png'
import Mess from '../../src/assets/message.png'
import MessSel from '../../src/assets/messSel.png'
import Noti from '../../src/assets/noti.png'
import Dash from '../../src/assets/dash.png'
import DashSel from '../../src/assets/dashSel.png'
import Ms from '../../src/assets/ms.png'

const settings = ["Profile", "Account", "Dashboard", "Report","Logout"];
function Horizantalbar({ handleLogout, filteredAlumniData, setFilteredAlumniData, alumniData, setAlumniData }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [searchValueJob, setSearchValueJob] = useState("");
  const [searchValueLocation, setSearchValueLocation] = useState("");
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [notifications, setNotifications] = useState([])
  const [name, setName] = useState("")
  const [img, setImg] = useState("")

  const handleMenuClick = (setting) => {
    handleCloseUserMenu(); // Close the menu
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Account":
        navigate("/account");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Report":
        navigate("/report");
        break;
      case "Logout":
        handleLogout() // Redirect to a logout handler or page
        break;
      default:
        break;
    }
  };

  const fetchName = async () => {
    if (user.role === 'alumni') {
      const response = await axios.get(`http://localhost:8081/alumini/name/${user.id}`)
      setName(response.data.name)
      setImg(response.data.profile_image_path)
    }
  }
  fetchName()

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    // setOpen(true);
  };

  const handleNotificationClick = (event) => {
    setAnchorElNotification(event.currentTarget);
    setActiveIcon("notification");
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
    setActiveIcon(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const username = user.email ? user.email.match(/^([^.]+)/)[0] : "";

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizeFirstLetter1 = (email) => {
    const username = email ? email.match(/^([^.]+)/)[0] : "";
    if (!username) return "";
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  const capitalizedUsername = capitalizeFirstLetter(username);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/notifications/${user.id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching Notifications:', error);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(alumniData)
    const filteredData = alumniData.filter((alumni) => {
      const matchesJob = alumni.role
        .toLowerCase()
        .includes(searchValueJob.toLowerCase());
      const matchesLocation = alumni.location
        .toLowerCase()
        .includes(searchValueLocation.toLowerCase());

      // Both fields must match if values are provided
      return (!searchValueJob || matchesJob) && (!searchValueLocation || matchesLocation);
    });

    setFilteredAlumniData(filteredData);
  }, [searchValueJob, searchValueLocation, alumniData, setFilteredAlumniData]);

  function extractTimeWithAmPm(isoString) {
    const date = new Date(isoString);

    // Extract hours, minutes (local time)
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Determine AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Return the formatted time
    return `${hours}:${minutes} ${amPm}`;
  }

  return (
    <div className="horinav">
      <div className="nav-left">
        <Box sx={{ display: "flex", flexDirection: "center", mr: "20px" }}>
          <Searchbar
            backgroundColor="#EEEEEE"
            placeholderText="Project Manager"
            iconColor="black"
            width="40%"
            sx={{ textAlign: "float-left", mr: "50px" }}
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
              style: { textAlign: 'center', mr: "20px" }
            }}
          />
        </Box>
      </div>
      <div className="nav-icons">
        <Link to="/home">
          <Box onClick={() => handleIconClick('grid')}>
            <img src={activeIcon === 'grid' ? DashSel : Dash} height="26px" />
          </Box>
        </Link>

        <Link to="/chatting">
          <Box onClick={() => handleIconClick('message')}>
            <img src={activeIcon === 'message' ? MessSel : Mess} height="26px" />
          </Box>
        </Link>
        <Link to="/internship-lists">
          <Box onClick={() => handleIconClick('internship')}>
            <img src={activeIcon === 'internship' ? JobSelect : Job} height="29px" />
          </Box>
        </Link>
        <Link to="/message-forum">
          <Box onClick={() => handleIconClick('notes')}>
            <img src={activeIcon === 'notes' ? ThreadSelect : Threads} height="26px" />
          </Box>
        </Link>
        <Link>
          <Box onClick={handleNotificationClick}>
            <img src={activeIcon === 'notification' ? Noti : Noti} height="26px" />
          </Box>

          <Popover
            open={Boolean(anchorElNotification)}
            anchorEl={anchorElNotification}
            onClose={handleCloseNotification}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box sx={{ padding: 2, maxWidth: 350 }}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", mb: 1 }}>
                Notifications
              </Typography>
              {notifications && notifications.map((item, index) => <Box><Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  alt="John Doe"
                  src={item.role === 'alumni' && item.connected_details.profile_image_path ? `http://localhost:8081/${item.connected_details.profile_image_path.replace(/\\/g, "/")}` : Avatar2}
                  sx={{ marginRight: 1 }}
                />
                <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", color: '#757575' }}>
                  You have a new message from {item.role === 'alumni' ? item.connected_details.name : capitalizeFirstLetter1(item.connected_details.email)}.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "20%" }}>
                  <Link to='/chatting'>
                    <Box sx={{ ml: '4px', backgroundColor: "#3B64DF2E", borderRadius: "50%", display: "flex", alignItems: "center", p: "3px", cursor: "pointer" }}>
                      <img src={Ms} height="30px" width="29px" />
                    </Box></Link>
                  <Box sx={{ fontSize: "10px", color: "#6D6C80" }}>
                    {extractTimeWithAmPm(item.created_at)}
                  </Box>
                </Box>
               </Box>
               <Divider sx={{ my: 1 }} />
              </Box>)}
            </Box>
          </Popover>
        </Link>
        <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row", ml: "170px" }}>
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
              
              {user.role === 'alumni' ? name : capitalizedUsername}
            </Typography>
            <Typography sx={{mr: "10px", fontSize: "13px", color: "#767676", textAlign: 'center', fontWeight: 400 }}>
              {capitalizeFirstLetter(user.role)}
            </Typography>
          </Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user.role === 'alumni' && img?`http://localhost:8081/${img.replace(/\\/g, "/")}` :Avatar2} />
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
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
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
