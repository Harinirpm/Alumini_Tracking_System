import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/image1.png';
import { Dialog, DialogContent } from "@mui/material";
import AlumniProfile from "./AlumniProfile";
import axios from 'axios';
import './AlumniesList.css';
import Img1 from '../../assets/alumini2.png'
import Img from '../../assets/alumini.png'
import ProfileCreation from '../../Component/homepage/ProfileCreation';
import { UserContext } from "../../UserContext";
import { useContext } from "react";

function AluminiesList() {
    const [alumniData, setAlumniData] = useState([])
    const { user, setUser } = useContext(UserContext);
    const [profileCreated, setProfileCreated] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectedAlumni, setSelectedAlumni] = useState(null);

    const handleCardClick = (alumni) => {
        setSelectedAlumni(alumni);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAlumni(null);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };


    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get('http://localhost:8081/alumini/list')
                setAlumniData(response.data)
            } catch (error) {
                console.error('Error fetching alumni list:', error);
            }
        }

        fetchList();
    }, [open1])

    console.log("hi2")

    if (user.role === 'alumni') {
        const fetchProfile = async () => {
            console.log("hi1");
            try {
                console.log("hi3");
                const response = await axios.get(`http://localhost:8081/profile/${user.email}`);
                console.log("Response data:", response.data); // Log the data  
                console.log("Response status:", response.status); // Log the status  

                setProfileCreated(response.data.length > 0 ? true : false);
            } catch (error) {
                console.error('Error fetching alumni profile:', error); // Detailed error logging  
            }
        };

        fetchProfile(); // Call the function  
    }

    return (
        <><div className='back'>
            <br></br>
            <div className='head-card'>
                <div className='head-content'>
                    <div className='p'>We’d  love  for you  to</div>
                    <h2>Meet Our Grads Here...</h2>
                    <button>Explore more..</button>
                </div>
                <img src={image1} className='head-img' />
            </div>
            <div className='tit1'>
                <h2 className='tit'>Members</h2>
                {user.role === 'alumni' && <button onClick={() => setOpen1(true)}>{profileCreated ? "Update" : "Create"} {profileCreated} Profile</button>}
            </div>

            <div className='alumini-lists'>
                {alumniData.length > 0 && alumniData.map((alumini, index) => (
                    <div className='alumini-cards' key={index}  onClick={() => handleCardClick(alumini)}>
                        
                            <img src={alumini.profile_image_path ? `http://localhost:8081/uploads/${alumini.profile_image_path.replace(/\\/g, "/")}` : (index % 2) ? Img : Img1} alt={`${alumini.name}`} />
                            <div className='data'>
                                <h2>{alumini.name}</h2>
                                <p className='para'>{alumini.job_description}</p>
                                <div className='details'>
                                    <div className='d1'><p>{alumini.role}</p></div>
                                    <div className='d2'><p>{alumini.years_of_experience} years</p></div>
                                </div>
                                {/* <div className='tags'>
                                {alumini.tags.map((tag, index) => (
                                    <span className='tag' key={index}>{tag}</span>
                                ))}
                            </div> */}
                            </div>
                       
                    </div>
                ))}
            </div>
        </div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md"
                sx={{
                    '& .MuiPaper-root': {
                        borderTop: '15px solid blue', // Adds a stroke to the top of the dialog
                        borderRadius: '8px', // Optional: Keeps the corners rounded
                    }
                }}
            >
                <DialogContent>
                    {selectedAlumni && <AlumniProfile alumnusData={selectedAlumni} />}
                </DialogContent>
            </Dialog>
            {open1 && <ProfileCreation open={open1} handleClose={handleClose1} />}
        </>
    );
}

export default AluminiesList;