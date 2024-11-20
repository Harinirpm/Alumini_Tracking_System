import React from 'react'
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Categories from '../Component/messageForum/Categories';
import Threads from '../Component/messageForum/Threads';
import Popup from '../Component/messageForum/Popup';

function MessageForum() {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedCategory, setSelectedCategory] = useState('')
  const handleClick = (title) => {
     setSelectedCategory(title)
  }

  return (
 <Box sx={{mr:'20px', backgroundColor:''}}>
  <br></br>
    <Box sx={{display:'flex', width: '100%', alignItems:'center', justifyContent:'space-between'}}>
    <Typography sx={{fontSize:'26px', fontWeight:'600'}}>Categories</Typography>
    <Button variant='contained' sx={{borderRadius:'4px', textTransform:'none',backgroundColor:'#3B64DF', width:'130px'}} onClick={() => setOpen(true)}>Create Post</Button>
    </Box>
    <Categories handleClick={handleClick} />
    <Typography sx={{fontSize:'26px', fontWeight:'600',mb:'22px'}}>Popular Threads</Typography>
    <Threads selectedCategory={selectedCategory} />
    {open && <Popup open={open} handleClose={handleClose} />}
 </Box>
  )
}

export default MessageForum