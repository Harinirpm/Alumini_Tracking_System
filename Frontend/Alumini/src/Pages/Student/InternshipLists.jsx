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
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import JobInfo from './JobInfo';
import Popup from './Popup';

const companyLogos = {  
  "Zoho": Zoho,  
  "Spotify": Spotify,  
  "Microsoft": Microsoft,  
  "Flipkart": Flipkart,  
  "Facebook": Facebook,  
  "Amazon": Amazon,  
};

function InternshipLists() {
  const { user, setUser } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState('');
  const [internshipLists, setInternshipLists] = useState([]);
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState()
  const [selected, setSelected] = useState()
  const [filteredList, setFilteredList] = useState([])

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  
  const handleOpenInfo = (data) => {
    setSelected(data)
    setInfoOpen(true);
  };

  useEffect(() => {
    const fetchList = async () => {
        try {
            const response = await axios.get('http://localhost:8081/jobs')
            console.log(response)
            setInternshipLists(response.data)
            setFilteredList(response.data)
        } catch (error) {
            console.error('Error fetching alumni list:', error);
        }
    }

    fetchList();
}, [])

useEffect(() => {  
  if (!searchValue) {   
    setFilteredList(internshipLists);  
    return;  
  }  
  const lowerCaseSearchValue = searchValue.toLowerCase();  
  const filteredData = internshipLists.filter((job) => {  
    const lowerCaseJobTitle = job.job_title?.toLowerCase() || '';  
    const lowerCaseLocation = job.location?.toLowerCase() || '';  
    const lowerCaseCompanyName = job.company_name?.toLowerCase() || '';  

    return (  
      lowerCaseJobTitle.includes(lowerCaseSearchValue) ||  
      lowerCaseLocation.includes(lowerCaseSearchValue) ||  
      lowerCaseCompanyName.includes(lowerCaseSearchValue)  
    );  
  });  

  setFilteredList(filteredData);  
}, [searchValue, internshipLists]);


  return (
    <div className="internship-lists">
      <Box display='flex' flexDirection='row' alignItems="center">
     
          <div style={{display:"flex", flexDirection:"column"}}>
      <h2>Showing {filteredList.length} jobs</h2>
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
     {user.role==='alumni' &&  <button className='button1' onClick={() => setOpen(true)} >Create job offer</button> }

          </Box>
          <Box sx={{mt:"30px"}}>
      <div className="internship-grid">
        {filteredList.length>0 && filteredList.map((job, index) => (
          <div className="job-card" key={index}>
            <img src={companyLogos[job.company_name]} alt={job.company_name}  onClick={() => handleOpenInfo(job)} />
            <div className="job-details"  >
              <div className='job_comp'  onClick={() => handleOpenInfo(job)}>
              <h2>{job.job_title}</h2>
              <h3>{job.company_name}</h3>
                </div>
              <p className="job-package"  onClick={() => handleOpenInfo(job)}>
                <img src={CashBag} size={15} /><div className='sal'><h3 className='sal1'> {parseInt(job.expected_minimum_salary_per_year)}LPA-{parseInt(job.expected_maximum_salary_per_year)}LPA</h3> <h3 className='sal2'> Per year</h3></div>
              </p>
              <p className="job-location"  onClick={() => handleOpenInfo(job)}>
              <img src={Location} style={{fontSize:"25px",color:"blue",backgroundColor:"#1B4BDA1C"}}/> <div><h3 className='loc1'>{job.location}</h3>
              <h3 className='loc2'>Location</h3></div>
              </p>
              <a href={job.offer_url}  target="_blank"><button className="apply-button">Apply</button></a>
              {/* <div className='book'>
              <FaRegBookmark />
              </div> */}
            </div>
          </div>
        ))}
      </div>
      {open && <Popup open={open} handleClose={handleClose} />}
      {infoOpen && <JobInfo open={infoOpen} handleClose={handleCloseInfo} data={selected} />}
      </Box>
    </div>
  );
}

export default InternshipLists;
