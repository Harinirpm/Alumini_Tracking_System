import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Img from '../../assets/profile.png'

function Threads({selectedCategory, open}) {
    const [threads, setThreads] = useState([])
    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await axios.get('http://localhost:8081/threads');
                setThreads(response.data);
                console.log(threads)
                console.log('Fetched Threads:', response.data);

            } catch (error) {
                console.error('Error fetching threads:', error);
            }
        };

        fetchThreads();
    }, [open]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = days[date.getUTCDay()];
        const hours = date.getUTCHours() % 12 || 12; // Convert to 12-hour format
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const ampm = date.getUTCHours() >= 12 ? 'PM' : 'AM';
        return `${day} ${hours}:${minutes}${ampm}`;
    };

    const filteredThreads = threads.filter(thread => 
        selectedCategory === "All" || selectedCategory==='' || thread.thread_domain === selectedCategory
    );
    

  return (
   <Box sx={{mr:2, overflowY:'auto', height:'400px',width:'96%',pr:4,pl:4, '&::-webkit-scrollbar': {display: 'none'}}}>
     {filteredThreads.length>0 && filteredThreads.map((item, index) => (
        <Box  key={index} sx={{background:'white', border: 'white 1px solid',mt:2, mb:1,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',borderRadius:'8px',p:2}}>
            <Box sx={{display:'flex', gap:'20px',alignItems:'center'}}>
                <img src={Img} alt='image' height='50px' width='50px' />
                <Typography sx={{fontWeight: 600, fontSize: '17px', color:'#161439',ml:'2px'}}>Lakshanya</Typography>
                <Typography sx={{color:'#6D6C80', fontSize:'12px', fontWeight:600}}> {formatDate(item.created_at)}</Typography>
            </Box>
            <Box sx={{ml:'70px', width:'77%'}}>
                <Typography sx={{fontSize:'14px', color:'#393737', fontWeight:600, letterSpacing:'1px', textAlign:`${item.image? "center": ''}`}}>{item.thread_content}</Typography>
            </Box>
            <Box sx={{display:'flex', width:'100%', alignItems:'center', justifyContent:'flex-end',gap:'20px'}}>
                <Box sx={{display:'flex', gap:'3px', alignItems:'center'}}>
                   {item.liked ?  <FavoriteOutlinedIcon sx={{ color:'#FF0505', cursor: 'pointer' }} />: <FavoriteBorderOutlinedIcon /> }
                    <Typography sx={{color:'#6D6C80', fontSize:'12px', fontWeight: 600}}>{item.likes} Likes</Typography>
                </Box>
                <Box sx={{display:'flex', gap:'3px', alignItems:'center'}}>
                   {item.commented ?<ChatBubbleOutlinedIcon sx={{ color: '#0E0AFFBD', cursor:'pointer' }} /> : <ChatBubbleOutlineOutlinedIcon /> }
                    <Typography sx={{color:'#6D6C80', fontSize:'12px', fontWeight: 600}}>{item.comments} Comments</Typography>
                </Box>
            </Box>
        </Box>
     ))}
   </Box>
  )
}

export default Threads