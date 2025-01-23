import React, { useEffect, useState } from "react";
import "./AlumniProfile.css";
import Avatar2 from "../../assets/avatar2.jpeg";
import Img1 from '../../assets/alumini2.png'
import Img from '../../assets/alumini.png'
import { Button } from "@mui/material";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AlumniProfile({ alumnusData }) {
  const { user } = useContext(UserContext);
  const [Connected, setConnected] = useState(false)
  const navigate = useNavigate()
  console.log(alumnusData)
  useEffect(() => {
       const checkConnection = async () => {
        try{
          const response = await axios.get(`http://localhost:8081/checkConnection/${user.email}/${alumnusData.user_id}`)
          if(response.data.length > 0) setConnected(true)
          

        }catch (error){
          console.error('Error: ', error)
        }
       }
       checkConnection()
  }, [alumnusData])

  const handleClick = async () => {
    try {
      if (!Connected) {
        const response = await axios.put(`http://localhost:8081/createConnection/${user.email}/${alumnusData.user_id}`);

        if (response.data.message==="Connection created.") {
          setConnected(true);
        } else {
          console.error("Connection not created");
        }
      }
      if(Connected) navigate('/chatting')
    } catch (error) {
      console.error("Error creating connection:", error);
    }
  };
  

  return (
    <div className="alumni-container">
      <div className="alumni-profile">
        <img src={alumnusData.profile_image_path ? `http://localhost:8081/${alumnusData.profile_image_path.replace(/\\/g, "/")}` :  Img } alt={alumnusData.name} className="avatar" />
        <h3 className="alumni-name">{alumnusData.name}</h3>
        
            <p className="alumni-status1">
            <strong >Role:</strong> <span>{alumnusData.role}</span>
          </p>
          <p className="alumni-status1">
            <strong>Years of Experience:</strong> <span>{alumnusData.years_of_experience}</span>
          </p>
          <p className="alumni-status1">
            <strong >Phone:</strong> <span>{alumnusData.phone_number}</span>
          </p>
         
       {alumnusData.personalWebsite &&   <p className="alumni-status">
            <strong>Personal Website:</strong>{" "}
            <a
              href={alumnusData.personalWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </p> }
          <p className="alumni-status1">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={alumnusData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </p>         
      </div>
      <div className="alumni-basic-info">
      <div className="boxAlumni">
         {user.id!=alumnusData.user_id && <button className="button1" onClick={() => handleClick()}>{Connected ? "Message" :"Connect"}</button> }
          </div>
          <p className="alumni-status">
            <strong>Email:</strong> <span>{alumnusData.email}</span>
          </p>
      <p>
          <strong>Department:</strong> <span>{alumnusData.department}</span>
        </p>
        <p>
          <strong>Passed Out Year:</strong> {alumnusData.passed_out_year}
        </p>
        <p>
          <strong>Company:</strong> {alumnusData.company_name}
        </p>
        <p>
          <strong>Domain Of Work:</strong> {alumnusData.domain}
        </p>
        <p>
          <strong>Job Description:</strong> {alumnusData.job_description}
        </p>

          <p className="alumni-status">
            <strong>Location:</strong> <span>{alumnusData.location}</span>
          </p>
      </div>
    </div>
  );
}

export default AlumniProfile;
