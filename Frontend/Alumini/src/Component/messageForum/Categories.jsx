import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloudComputing from '../../assets/cc.png'
import MobileApp from '../../assets/mobile.png'
import DataAnalyst from '../../assets/dataanalyst.png'
import WebDevelopment from '../../assets/webdevelopment.png'
import UiUx from '../../assets/uiux.png'
import Machinelearning from '../../assets/ml.png'
import Electrical from '../../assets/electrical.png'

function Categories({handleClick}) {
    const category= [
        {image:UiUx, title:'UI & UX Design', threads: 120, backgroundColour:'#FF0ACA'},
        {image:DataAnalyst, title:'Data Analysis', threads: 120,backgroundColour:'#FF910A'},
        {image:Machinelearning, title:'Machine Learning', threads: 120,backgroundColour:'#FF0A0A'},
        {image:WebDevelopment, title:'Web Development', threads: 120,backgroundColour:'#C20AFF'},
        {image:CloudComputing, title:'Cloud Computing', threads: 120,backgroundColour:'#FF0A68'},
        {image:MobileApp, title:'Mobile App Develop', threads: 120,backgroundColour:'#0A60FF'},
        {image:Electrical, title:'Electrical', threads: 120,backgroundColour:'#00D4FF'},
        {image:Electrical, title:'All Domains', threads: 120,backgroundColour:'#FF910A'},
    ] 

  return (
<Box sx={{display:'flex', flexWrap:'wrap', maxWidth: '93%', justifyContent: 'space-between',mt:'20px' }}>
   {category.map((item) => (
    <Box onClick={() => handleClick(item.title)} sx={{border: "#CECECE solid 1px", borderRadius:'8px',p:2, display:'flex', alignItems:'center', gap:'2px', width:'216px',mb:3, height:'60px', background: 'white', cursor:'pointer'}} >
        <Box sx={{backgroundColor:`${item.backgroundColour}`, borderRadius:'50%', height:'50px', width:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img src={item.image} alt={item.title} height='29px' width='29px' />
        </Box>
        <Box sx={{width:'80%'}}>
        <Typography sx={{ color: '#767676', fontSize: '14px', fontWeight: 600, textAlign: 'center', width: '100%' }}>{item.title}</Typography>
      <Typography sx={{color:'#767676', fontSize:'11px', fontWeight:400,textAlign:'center', mt:1}}>{item.threads} threads</Typography>
      </Box>
    </Box>
   ))}
</Box>
  )
}

export default Categories