import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Img from '../assets/alumini.png';

const AlumniDetailPage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [alumniDetails, setAlumniDetails] = useState(null);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8081/profile/${email}`)
      .then((response) => setAlumniDetails(response.data[0]))
      .catch((error) => console.error('Error fetching alumni details:', error));
  }, [email]);

  const handleApprove = () => {
    axios
      .post(`http://localhost:8081/alumini/approve/${alumniDetails.user_id}/${email}`)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => console.error('Error approving alumni:', error));
  };

  const handleReject = () => {
    axios
      .post(`http://localhost:8081/alumini/reject/${alumniDetails.user_id}/${email}`, { reason: rejectReason })
      .then(() => {
        setOpenRejectDialog(false);
        navigate('/home');
      })
      .catch((error) => console.error('Error rejecting alumni:', error));
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
  };

  if (!alumniDetails)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        padding: '2rem',
        maxHeight: '100vh',
        overflowY: 'auto',
        boxSizing: 'border-box',
        padding:"80px"
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: '#1976d2',
          mb: 2,
          fontSize: '30px',
          padding:"20px"
        }}
      >
        <KeyboardBackspaceOutlinedIcon
          sx={{
            fontSize: '35px',
            cursor: 'pointer',
            mr: 1,
          }}
          onClick={() => navigate('/home')}
        />
        Alumni Details
      </Typography>

      <Card
        sx={{
          marginBottom: '2rem',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: 5,
        }}
      >
        <CardContent>
          <Box sx={{display:"flex",flexDirection:"row",
            justifyContent:"space-between",
          }}>
    <Box>
   <Grid container spacing={1} alignItems="center">
    {/* Profile Image Section */}
    <Box sx={{
display:"flex",
flexDirection:"column",
    }}>
    <Box
      sx={{
        // width: '40%',
        maxWidth: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        src={
          alumniDetails.profile_image_path
            ? `http://localhost:8081/${alumniDetails.profile_image_path.replace(/\\/g, '/')}`
            : Img
        }
        alt={alumniDetails.name}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          
        }}
      />
    </Box>
 <Box>
  
 </Box>
    </Box>

    <Box
      sx={{
        padding: '20px',
       
        borderRadius: '12px',
        
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '8px',
        
        }}
      >
        {alumniDetails.name}
      </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
        }}
      >
        {alumniDetails.email}
      </Typography>
      </Box>
      
</Grid>
</Box>
<Box>
<Grid container spacing={2} justifyContent="center">
        
        <Grid item>
          <Button variant="contained"  sx={{textTransform:"none"}}  sx={{textTransform:"none",height:"70%",padding:"15px",width:"100px",
            backgroundColor:"#F72626 !important"
          }} onClick={() => setOpenRejectDialog(true)}>
            Reject
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" sx={{textTransform:"none",height:"70%",padding:"15px",width:"100px",backgroundColor:"#4182F9 !important"}} onClick={handleApprove}>
            Approve
          </Button>
        </Grid>
      </Grid>
</Box>
</Box>
<Box
sx={{display:"flex",
  flexDirection:"row",
  // justifyContent:"space-between"
}}
>
<Box sx={{display:"flex",
flexDirection:"column",
flex:0.6,

}}>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
          mt:"20px"
        }}
      >
        <strong>Phone</strong> 
        <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.phone_number}</Box>
      </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
          mt:"10px",
        }}
      >
        <strong>Gender</strong> 
        <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >
        {alumniDetails.gender}</Box>
      </Typography>
      <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
          mt:"10px",
        }}>
            <strong>Graduation Year</strong> 
            <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.passed_out_year}</Box>
          </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
          mt:"10px",
        }}
      >
        <strong>Date of Birth</strong> 
        <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.date_of_birth}</Box>
      </Typography>
    
  
         
          <Typography 
          sx={{
            color: '#555',
            fontSize: '16px',
            marginBottom: '8px',
            mt:"10px",
            
          }}
          >
            <strong>Degree</strong> 
            <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.degree}</Box>
          </Typography>
          
          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"10px"
        }}>
            <strong>Department</strong> 
            <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.department}</Box>
          </Typography>
          {alumniDetails.verification_document &&
          <Typography sx={{
            color: '#555',
            fontSize: '16px',
            marginBottom: '8px',
             mt:"10px"
          }}>
            <strong>Document For Verification</strong>{' '}
            <Box
        sx={{height:"40%",
          width:"80%",
          
          backgroundColor:"#F9F9F9",
          padding:"10px",
          borderRadius:"8px",
          mt:"10px"
        }}
        ><a href={`http://localhost:8081/${alumniDetails.verification_document.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
              View Document
            </a></Box>
          </Typography>
}
          </Box>
          {/* <Divider sx={{ my: 2 }} /> */}
          <Box
x={{display:"flex",
  flexDirection:"column",
 
  }}
>
    
          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"20px"
        }}>
            <strong>Roll No</strong> 
            <Box
        sx={{height:"60%",
          width:"420%",
          backgroundColor:"#F9F9F9",
          padding:"13px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.roll_no}</Box>
          </Typography>
         
      
          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"10px"
        }}>
            <strong>Role</strong> 
            <Box
        sx={{height:"40%",
          width:"420%",
          
          backgroundColor:"#F9F9F9",
          padding:"13px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.jobtitle}</Box>
          </Typography>
          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"10px"
        }}>
            <strong>Company</strong> 
            <Box
        sx={{height:"40%",
          width:"420%",
          
          backgroundColor:"#F9F9F9",
          padding:"13px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.company_name}</Box>
          </Typography>
          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"10px"
        }}>
            <strong>Location</strong> 
            <Box
        sx={{height:"40%",
          width:"420%",
          
          backgroundColor:"#F9F9F9",
          padding:"13px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.location}</Box>
          </Typography>
          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"10px"
        }}>
            <strong>Experience</strong> 
            <Box
        sx={{height:"40%",
          width:"420%",
          
          backgroundColor:"#F9F9F9",
          padding:"13px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >{alumniDetails.years_of_experience} years </Box>
          </Typography>


          <Typography sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
           mt:"20px"
        }}>
            <strong>LinkedIn</strong>{' '}
            <Box
        sx={{height:"40%",
          width:"420%",
          
          backgroundColor:"#F9F9F9",
          padding:"13px",
          borderRadius:"8px",
          mt:"10px"
        }}
        >
            <a href={alumniDetails.linkedin} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
            </Box>
          </Typography>
          </Box>
</Box>
      
        </CardContent>
      </Card>

      

      <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}  maxWidth="xs" fullWidth>
        <DialogTitle>Provide a Reason for Rejection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            fullWidth
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>Cancel</Button>
          <Button color="error" onClick={handleReject}>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlumniDetailPage;
