import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Img from '../../assets/blankProfile.png'
import { useContext } from 'react';
import {UserContext} from '../../UserContext'

function Threads({ selectedCategory, open }) {
    const [threads, setThreads] = useState([])
    const  {user} = useContext(UserContext)
    const [post,setPost] = useState(false)
    console.log(user.id)
    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/threads/${user.id}`);
                setThreads(response.data);
                console.log(response.data)

            } catch (error) {
                console.error('Error fetching threads:', error);
            }
        };

        fetchThreads();
    }, [open,post]);

    const handleClick = async (threadId) => {
        try {
          const response = await axios.post(
            `http://localhost:8081/threads/like/${threadId}/${user.id}`
          );

          setPost((prevState) => !prevState);
        } catch (error) {
          console.error("Error liking the thread:", error);
        }
      };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = days[date.getUTCDay()];
        const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero to minutes
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM
        return `${day} ${hours}:${minutes}${ampm}`;
    };

    const filteredThreads = threads.filter(thread =>
        selectedCategory === "All Domains" || selectedCategory === '' || thread.thread_domain === selectedCategory
    );

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        const firstPart = str.split('@')[0];
        const namePart = firstPart.split('.')[0];
        return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
    };

    console.log(filteredThreads[0]?.created_by_details.role)


    return (
        <Box sx={{ mr: 2, overflowY: 'auto', height: '400px', width: '96%', pr: 4, pl: 4, '&::-webkit-scrollbar': { display: 'none' } }}>
            {filteredThreads.length > 0 && filteredThreads.map((item, index) => (
                <Box key={index} sx={{ background: 'white', border: 'white 1px solid', mt: 2, mb: 1, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '8px', p: 2 }}>
                    <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <img src={ item?.created_by_details.profile_image_path ?  `http://localhost:8081/${item?.created_by_details.profile_image_path.replace(/\\/g, "/")}` :Img} alt='image' height='47px' width='47px' />
                        <Typography
                            sx={{ fontWeight: 600, fontSize: '17px', color: '#161439', ml: '2px' }}
                        >
                            {item?.created_by_details.role === 'alumni'
                                ? item?.created_by_details.name
                                : capitalizeFirstLetter(item?.created_by_details.email || '')
                            }{" "}({capitalizeFirstLetter(item?.created_by_details.role)})
                        </Typography>

                        <Typography sx={{ color: '#6D6C80', fontSize: '12px', fontWeight: 600 }}> {formatDate(item.created_at)}</Typography>
                    </Box>
                    <Box sx={{ ml: '70px', width: '77%' }}>
                        <Typography sx={{ fontSize: '14px', color: '#393737', fontWeight: 600, letterSpacing: '1px', textAlign: `${item.image ? "center" : ''}` }}>{item.thread_content}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
                        <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center', cursor:"pointer" }} onClick={() => handleClick(item.id)}>
                            {item.liked ? <FavoriteOutlinedIcon sx={{ color: '#FF0505', cursor: 'pointer' }} /> : <FavoriteBorderOutlinedIcon />}
                            <Typography sx={{ color: '#6D6C80', fontSize: '12px', fontWeight: 600 }}>{item.likes} Likes</Typography>
                        </Box>
                        {/* <Box sx={{display:'flex', gap:'3px', alignItems:'center'}}>
                   {item.commented ?<ChatBubbleOutlinedIcon sx={{ color: '#0E0AFFBD', cursor:'pointer' }} /> : <ChatBubbleOutlineOutlinedIcon /> }
                    <Typography sx={{color:'#6D6C80', fontSize:'12px', fontWeight: 600}}>{item.comments} Comments</Typography>
                </Box> */}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default Threads