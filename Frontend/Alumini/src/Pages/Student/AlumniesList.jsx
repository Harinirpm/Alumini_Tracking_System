import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import AlumniProfile from "./AlumniProfile";
import "./AlumniesList.css";
import Img1 from "../../assets/alumini2.png";
import Img from "../../assets/alumini.png";

function AluminiesList() {
  const [alumniData, setAlumniData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get("http://localhost:8081/alumini/list");
        setAlumniData(response.data);
      } catch (error) {
        console.error("Error fetching alumni list:", error);
      }
    };

    fetchList();
  }, []);
  const handleCardClick = (alumni) => {
    setSelectedAlumni(alumni);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedAlumni(null);
  };

  return (
    <div className="back">
      <br />
      <div className="head-card">
        <div className="head-content">
          <div className="p">We’d love for you to</div>
          <h2>Meet Our Grads Here...</h2>
          <button>Explore more..</button>
        </div>
        <img src="../../assets/image1.png" className="head-img" alt="Header" />
      </div>
      <h2 className="tit">Members</h2>
      <div className="alumini-lists">
        {alumniData.length > 0 &&
          alumniData.map((alumni, index) => (
            <div
              className="alumini-cards"
              key={index}
              onClick={() => handleCardClick(alumni)}
            >
              <img
                src={index % 2 ? Img : Img1}
                alt={`${alumni.name}`}
                className="card-img"
              />
              <div className="data">
                <h2>{alumni.name}</h2>
                <p className="para">{alumni.about}</p>
                <div className="details">
                  <div className="d1">
                    <p>{alumni.job_title}</p>
                  </div>
                  <div className="d2">
                    <p>{alumni.years_of_experience}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
}

export default AluminiesList;
