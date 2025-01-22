import React, { useEffect } from 'react'
import Modal from "@mui/material/Modal";
import { Button, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useContext } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "1px solid none",
    boxShadow: 24,
    borderRadius: '6px',
    height: "80%",
};

function ProfileCreation({ open, handleClose, id, profileCreated }) {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [department, setDepartment] = useState('');
    const [passedOutYear, setPassedOutYear] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('')
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [phone, setPhone] = useState('');
    const [modify, setModify] = useState(true)
    useEffect(() => {
        if (profileCreated) {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/alumini/profile/${id}`);
                    const profile = response.data;

                    // Setting state with fetched data
                    setName(profile.name || '');
                    setImage(profile.profile_image_path || null);
                    setDepartment(profile.department || '');
                    setPassedOutYear(profile.passed_out_year || '');
                    setRole(profile.role || '');
                    setLocation(profile.location || '');
                    setCompany(profile.company_name || '');
                    setDescription(profile.job_description || '');
                    setYearsOfExperience(profile.years_of_experience || '');
                    setLinkedin(profile.linkedin || '');
                    setPhone(profile.phone_number || '');
                } catch (error) {
                    console.error('Error fetching alumni profile:', error); // Detailed error logging
                }
            };

            fetchProfile();
        }
    }, [profileCreated, id]);

    const handleSubmit = async () => {
        const postData = {
            name: name,
            image: image ? image : null,
            department: department,
            passedOutYear: passedOutYear,
            role: role,
            company: company,
            description,
            yearsOfExperience,
            linkedin,
            phone,
            location: location,
            email: user.email,
        };

        try {
            if (profileCreated) {
                // Check if the profile exists using the ID
                const checkResponse = await axios.get(`http://localhost:8081/alumini/profile/${id}`);
                if (checkResponse.status === 200 && checkResponse.data) {
                    // Profile exists, perform an update (PUT)
                    const updateResponse = await axios.put(
                        `http://localhost:8081/alumini/update/profile/${id}`,
                        postData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );

                    if (updateResponse.status === 200) {
                        alert('Profile updated successfully!');
                        handleClose();
                    } else {
                        alert('Failed to update the profile.');
                    }
                } else {
                    throw new Error('Profile not found.');
                }
            } else {
                // If no ID is provided, create a new profile (POST)
                const response = await axios.post(
                    'http://localhost:8081/alumini/create/profile',
                    postData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.status === 200) {
                    alert('Profile created successfully!');
                    handleClose();
                } else {
                    alert('Failed to create the profile.');
                }
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
            alert('An error occurred while submitting the profile.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ height: '11px', background: '#1B4BDA' }}></Box>
                <Box sx={{ p: 2 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '24px', color: '#101010' }}>Profile</Typography>
                        <Typography sx={{ fontWeight: 400, fontSize: '17px', color: '#767676', mt: '4px' }}>Create your profile here...</Typography>
                    </Box>
                    <Box sx={{ p: 3, overflowY: 'auto', height: '475px', width: '96%', pr: 4, pl: 4, '&::-webkit-scrollbar': { display: 'none' }, mt: '2px' }}>
                        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
                            <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
                                <TableBody sx={{ display: 'flex', flexDirection: 'column', gap: '16px', pr: 2 }}>

                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Name: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Your Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={2}
                                        sx={{
                                            borderBottom: 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>
                                            Profile Image:{' '}
                                        </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}>
                                            <input
                                                id="outlined-basic"
                                                placeholder="Import image here"
                                                variant="outlined"
                                                style={{
                                                    border: '#42506666 1.6px solid',
                                                    borderRadius: '8px',
                                                    width: '600px',
                                                    height: '40px',
                                                    lineHeight: '40px',
                                                    paddingLeft: '12px',
                                                }}
                                                type="file"
                                                onChange={(e) => {setImage(e.target.files[0]); setModify(false)}}
                                            />
                                           
                                            {image && modify ? (
                                                <div style={{ marginTop: '7px' }}>
                                                    <a
                                                        href={`http://localhost:8081/${image.replace(/\\/g, "/")}`} // Display image locally
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: '#1976D2',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        View uploaded image
                                                    </a>
                                                </div>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={2} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Department: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Your Department" variant="outlined" style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} value={department} onChange={(e) => setDepartment(e.target.value)} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Passed Out Year: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Passed Out Year" variant="outlined" value={passedOutYear} onChange={(e) => setPassedOutYear(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Current Role: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Current Role in workplace" variant="outlined" value={role} onChange={(e) => setRole(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Company: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Name of the Company" variant="outlined" value={company} onChange={(e) => setCompany(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Job Description: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Job Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Location: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Location" variant="outlined" value={location} onChange={(e) => setLocation(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Years Of Experience: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Experience in the current role" variant="outlined" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>LinkedIn: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="LinkedIn" variant="outlined" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>
                                    <TableRow key={1} sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <TableCell align='left' sx={{ fontWeight: 400, fontSize: '18px', border: 'none' }}>Phone Number: </TableCell>
                                        <TableCell align="right" sx={{ border: 'none' }}><input id="outlined-basic" placeholder="Enter Phone Number" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ border: '#42506666 1.6px solid', borderRadius: '8px', width: '600px', height: '40px', textAlign: 'left', lineHeight: '40px', paddingLeft: '12px' }} /></TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                    <Box sx={{ width: '94%', display: 'flex', justifyContent: 'end' }}>
                        <Button variant='contained' sx={{ borderRadius: '4px', textTransform: 'none', backgroundColor: '#3B64DF', textAlign: 'right', width: '120px', mt: '20px' }} onClick={() => handleSubmit()}>{profileCreated ? "Update" : "Create"}</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ProfileCreation