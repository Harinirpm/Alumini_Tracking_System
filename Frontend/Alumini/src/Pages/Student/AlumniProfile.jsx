import React from "react";
import "./AlumniProfile.css";
import Avatar2 from "../../assets/avatar2.jpeg";

function AlumniProfile({ alumnusData }) {
  return (
    <div className="alumni-container">
      <div className="alumni-profile">
        <img src={Avatar2} alt={alumnusData.name} className="avatar" />
        <h3 className="alumni-name">{alumnusData.name}</h3>
        
            <p className="alumni-status">
            <strong >Role:</strong> <span>{alumnusData.role}</span>
          </p>
          <p className="alumni-status">
            <strong >Phone:</strong> <span>{alumnusData.phone}</span>
          </p>
          <p className="alumni-status">
            <strong>Email:</strong> <span>{alumnusData.email}</span>
          </p>
          <p className="alumni-status">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={alumnusData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </p>
          <p className="alumni-status">
            <strong>Personal Website:</strong>{" "}
            <a
              href={alumnusData.personalWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </p>
         
      </div>
      <div className="alumni-basic-info">
      <p>
          <strong>Department:</strong> <span>{alumnusData.department}</span>
        </p>
        <p>
          <strong>Passed Out Year:</strong> {alumnusData.passedOutYear}
        </p>
        <p>
          <strong>Company:</strong> {alumnusData.company}
        </p>
        <p>
          <strong>Job Description:</strong> {alumnusData.description}
        </p>
      </div>
    </div>
  );
}

export default AlumniProfile;
