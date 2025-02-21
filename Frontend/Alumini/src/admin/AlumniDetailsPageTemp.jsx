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
          padding: 2,
        }}
      >
        <CardContent>
        <Grid container spacing={4} alignItems="center">
  {/* Profile Image Section */}
  <Grid item xs={12} sm={4} md={3}>
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',
        borderRadius: '12px',
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
  </Grid>

  {/* Alumni Details Section */}
  <Grid item xs={12} sm={8} md={9}>
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
        <strong>Email:</strong> {alumniDetails.email}
      </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
        }}
      >
        <strong>Phone:</strong> {alumniDetails.phone_number}
      </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
        }}
      >
        <strong>Gender:</strong> {alumniDetails.gender}
      </Typography>
      <Typography
        sx={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '8px',
        }}
      >
        <strong>Date of Birth:</strong> {alumniDetails.date_of_birth}
      </Typography>
    </Box>
  </Grid>
</Grid>


          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Educational Details
          </Typography>
          <Typography >
            <strong>Degree:</strong> {alumniDetails.degree}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Department:</strong> {alumniDetails.department}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Graduation Year:</strong> {alumniDetails.passed_out_year}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Roll No:</strong> {alumniDetails.roll_no}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Professional Details
          </Typography>
          <Typography>
            <strong>Role:</strong> {alumniDetails.jobtitle}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Company:</strong> {alumniDetails.company_name}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Location:</strong> {alumniDetails.location}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Experience:</strong> {alumniDetails.years_of_experience} years
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Social Links
          </Typography>
          <Typography>
            <strong>LinkedIn:</strong>{' '}
            <a href={alumniDetails.linkedin} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </Typography>
          {alumniDetails.verification_document &&
          <Typography sx={{mt:1}}>
            <strong>Document For Verification:</strong>{' '}
            <a href={`http://localhost:8081/${alumniDetails.verification_document.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </Typography>
}
        </CardContent>
      </Card>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => setOpenRejectDialog(true)}>
            Reject
          </Button>
        </Grid>
      </Grid>

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
