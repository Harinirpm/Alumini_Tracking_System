import React from 'react'
import './AlumniProfile.css'
function AlumniProfile() {
  const alumnusData = {
    name: "John Doe",
    graduationYear: 2020,
    department: "Computer Science",
    email: "john.doe@example.com",
    phone: "+1-234-567-8901",
    address: "123 Elm Street, Springfield, IL, USA",
    currentJob: "Software Engineer at TechCorp",
    role: "Senior Software Engineer",
    jobDescription: "Develops and maintains high-performance applications and systems.",
    school: "Springfield High School",
    collegeDepartment: "Computer Science Department",
    passedOutYear: 2018,
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    personalWebsite: "https://www.johndoe.com",
    image: "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg" // Placeholder image URL
  };
  return (
    <div className="alumni-container">
      <div className="alumni-profile">
        <h2>Alumni Details</h2>
        <div className="details-card">
          <h3>{alumnusData.name}</h3>
          <p><strong>Graduation Year:</strong> <span>{alumnusData.graduationYear}</span></p>
          <p><strong>Department:</strong> <span>{alumnusData.department}</span></p>
          <p><strong>Address:</strong> <span>{alumnusData.address}</span></p>
          <p><strong>Current Job:</strong> <span>{alumnusData.currentJob}</span></p>
          <p><strong>Role:</strong> <span>{alumnusData.role}</span></p>
          <p><strong>Job Description:</strong> <span>{alumnusData.jobDescription}</span></p>
          <p><strong>School:</strong> <span>{alumnusData.school}</span></p>
          <p><strong>College Department:</strong> <span>{alumnusData.collegeDepartment}</span></p>
          <p><strong>Passed Out Year:</strong> <span>{alumnusData.passedOutYear}</span></p>
        </div>
      </div>
      <div className="alumni-image">
        <img src={alumnusData.image} alt={alumnusData.name} />
        <h3>{alumnusData.name}</h3>
        <p>{alumnusData.department}</p>
        <div className="alumni-contact-info">
          <p><strong>Phone:</strong> <span>{alumnusData.phone}</span></p>
          <p><strong>Email:</strong> <span>{alumnusData.email}</span></p>
          <p><strong>LinkedIn:</strong> <a href={alumnusData.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a></p>
          <p><strong>Personal Website:</strong> <a href={alumnusData.personalWebsite} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        </div>
        <button className="message-button">Message</button>
      </div>
    </div>
  )
}

export default AlumniProfile
