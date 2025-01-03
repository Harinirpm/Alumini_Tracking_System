import React from "react";
import "./AlumniProfile.css";
import Avatar2 from "../../assets/avatar2.jpeg";
import Img1 from '../../assets/alumini2.png'
import Img from '../../assets/alumini.png'
import { Button } from "@mui/material";


function AlumniProfile({ alumnusData }) {

  return (
    <div className="alumni-container">
      <div className="alumni-profile">
        <img src={alumnusData.profile_image_path ? `http://localhost:8081/uploads/${alumnusData.profile_image_path.replace(/\\/g, "/")}` :  Img } alt={alumnusData.name} className="avatar" />
        <h3 className="alumni-name">{alumnusData.name}</h3>
        
            <p className="alumni-status1">
            <strong >Role:</strong> <span>{alumnusData.role}</span>
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
      <div className="box">
          <button className="button1">Connect</button>
          </div>
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
          <strong>Job Description:</strong> {alumnusData.job_description}
        </p>
        <p className="alumni-status">
            <strong>Email:</strong> <span>{alumnusData.email}</span>
          </p>
      </div>
    </div>
  );
}

export default AlumniProfile;
