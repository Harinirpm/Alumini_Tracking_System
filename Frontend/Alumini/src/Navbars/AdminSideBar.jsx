import React from "react"; 
import { NavLink } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { MdLogout, MdHome, MdPeople } from "react-icons/md";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WorkIcon from '@mui/icons-material/Work';
import FeedIcon from '@mui/icons-material/Feed';

function AdminSidebar({ handleLogout }) {
  return (
    <Box
      sx={{
        width: "260px",
        height: "94.5vh",
        backgroundColor: "#212121", // Darker background for better contrast
        display: "flex",
        p: 3,
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
      
      }}
    >
      {/* Logo Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: "#fff", fontWeight: "bold" }}
        >
          Admin Dashboard
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List>
        <NavLink
          to="/home"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#fff" : "#bbb",
            backgroundColor: isActive ? "#1976d2" : "transparent",
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          })}
        >
          <ListItem button>
            <ListItemIcon>
            <HowToRegIcon sx={{ fontSize: 24, color: '#fff' }} />
            </ListItemIcon>
            <ListItemText
              primary="Approval Requests"
              sx={{
                color: "inherit",
                fontWeight: "500",
                marginLeft: -2, // Reduces the space between the icon and the text
              }}
            />
          </ListItem>
        </NavLink>

        <NavLink
          to="/alumni"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#fff" : "#bbb",
            backgroundColor: isActive ? "#1976d2" : "transparent",
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          })}
        >
          <ListItem button>
            <ListItemIcon>
              <MdPeople size={24} color="#fff" />
            </ListItemIcon>
            <ListItemText
              primary="Alumni List"
              sx={{
                color: "inherit",
                fontWeight: "500",
                marginLeft: -2, // Reduces the space between the icon and the text
              }}
            />
          </ListItem>
        </NavLink>

        <NavLink
          to="/Jobs"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#fff" : "#bbb",
            backgroundColor: isActive ? "#1976d2" : "transparent",
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          })}
        >
          <ListItem button>
            <ListItemIcon>
            <WorkIcon sx={{ fontSize: 22, color: '#fff' }} />

            </ListItemIcon>
            <ListItemText
              primary="Job List"
              sx={{
                color: "inherit",
                fontWeight: "500",
                marginLeft: -2, // Reduces the space between the icon and the text
              }}
            />
          </ListItem>
        </NavLink>

        <NavLink
          to="/threads"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#fff" : "#bbb",
            backgroundColor: isActive ? "#1976d2" : "transparent",
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          })}
        >
          <ListItem button>
            <ListItemIcon>
            <FeedIcon sx={{ fontSize: 23, color: '#fff' }} />

            </ListItemIcon>
            <ListItemText
              primary="Thread List"
              sx={{
                color: "inherit",
                fontWeight: "500",
                marginLeft: -2, // Reduces the space between the icon and the text
              }}
            />
          </ListItem>
        </NavLink>

        <NavLink
          to="/flags"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#fff" : "#bbb",
            backgroundColor: isActive ? "#1976d2" : "transparent",
            borderRadius: "8px", // Rounded corners
            margin: "5px 0",
          })}
        >
          <ListItem button>
            <ListItemIcon>
            <FeedIcon sx={{ fontSize: 23, color: '#fff' }} />

            </ListItemIcon>
            <ListItemText
              primary="Flag List"
              sx={{
                color: "inherit",
                fontWeight: "500",
                marginLeft: -2, // Reduces the space between the icon and the text
              }}
            />
          </ListItem>
        </NavLink>
      </List>

      {/* Logout Section */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          backgroundColor: "#333",
          borderTop: "1px solid #444",
          borderRadius: "8px", // Rounded corners
          position: "relative",
          bottom: 0,
          cursor: "pointer", // Add pointer cursor for interaction
        }}
        onClick={handleLogout}
      >
        <MdLogout size={24} color="#fff" />
        <Typography variant="subtitle1" sx={{ color: "#fff", mt: 1, fontWeight: "500" }}>
          Log Out
        </Typography>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
