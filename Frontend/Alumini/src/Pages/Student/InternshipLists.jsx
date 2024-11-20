import React, { useState, useEffect } from 'react';
import './InternshipLists.css';
import { CiLocationOn } from "react-icons/ci";
import { FaSackDollar } from 'react-icons/fa6';
import { FaRegBookmark } from "react-icons/fa";
import Box from '@mui/material/Box';
import axios from 'axios';
import Searchbar from '../../Component/Searchbar/Searchbar';
import Zoho from '../../assets/zoho.png'
import Spotify from '../../assets/spotify.png'
import Microsoft from '../../assets/microsoft.png'
import Flipkart from '../../assets/flipkart.png'
import Facebook from '../../assets/facebook.png'
import Amazon from '../../assets/amazon.png'
import CashBag from '../../assets/cashbag.png'
import Location from '../../assets/location.png'

const companyLogos = {  
  "Zoho": Zoho,  
  "Spotify": Spotify,  
  "Microsoft": Microsoft,  
  "Flipkart": Flipkart,  
  "Facebook": Facebook,  
  "Amazon": Amazon,  
};

function InternshipLists() {
  const [searchValue, setSearchValue] = useState('');
  const [internshipLists, setInternshipLists] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
        try {
            const response = await axios.get('http://localhost:8081/jobs')
            setInternshipLists(response.data)
        } catch (error) {
            console.error('Error fetching alumni list:', error);
        }
    }

    fetchList();
}, [])
  

  return (
    <div className="internship-lists">
      <Box display='flex' flexDirection='row' alignItems="center">
       
          <div style={{display:"flex", flexDirection:"column"}}>
      <h2>Showing 210 jobs</h2>
      <p style={{marginTop:"-20px" }}>Based On your Preference..</p>
      </div>
     
      <Searchbar
        backgroundColor="#EEEEEE"
        placeholderText="UI UX Designers"
        iconColor="black"
        width="30%"
        inputWidth="30ch"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
          </Box>
          <Box sx={{mt:"30px"}}>
      <div className="internship-grid">
        {internshipLists.length>0 && internshipLists.map((job, index) => (
          <div className="job-card" key={index}>
            <img src={companyLogos[job.company_name]} alt={job.company_name} />
            <div className="job-details">
              <div className='job_comp'>
              <h2>{job.job_title}</h2>
              <h3>{job.company_name}</h3>
                </div>
              <p className="job-package">
                <img src={CashBag} size={15} /><div className='sal'><h3 className='sal1'> {parseInt(job.expected_minimum_salary_per_year)}LPA-{parseInt(job.expected_maximum_salary_per_year)}LPA</h3> <h3 className='sal2'> Per year</h3></div>
              </p>
              <p className="job-location">
              <img src={Location} style={{fontSize:"25px",color:"blue",backgroundColor:" #e0e0e0"}}/> <div><h3 className='loc1'>{job.location}</h3>
              <h3 className='loc2'>Location</h3></div>
              </p>
              <button className="apply-button">Apply</button>
              <div className='book'>
              <FaRegBookmark />
              </div>
            </div>
          </div>
        ))}
      </div>
      </Box>
    </div>
  );
}

export default InternshipLists;
