import React, { useState, useEffect } from 'react';
import './InternshipLists.css';
import { CiLocationOn } from "react-icons/ci";
import { FaSackDollar } from 'react-icons/fa6';
import { FaRegBookmark } from "react-icons/fa";
import Box from '@mui/material/Box';
import Searchbar from '../Component/Searchbar/Searchbar';



function InternshipLists() {
  const [searchValue, setSearchValue] = useState('');
  const [internshipLists, setInternshipLists] = useState([
    {
      companyIcon:
        'https://w7.pngwing.com/pngs/103/711/png-transparent-zoho-office-suite-logo-zoho-corporation-google-docs-customer-relationship-management-crm-icon-text-rectangle-presentation-thumbnail.png',
      company: 'Senior UX designer',
      packageRange: '4LPA-8LPA',
      location: 'Bangalore',
      apply: 'Apply',
    },
    {
      companyIcon:
        'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      company: 'Software Engineer II',
      packageRange: '4LPA-8LPA',
      location: 'Bangalore',
      apply: 'Apply',
    },
    {
      companyIcon:
        'https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png',
      company: 'Senior UX designer',
      packageRange: '4LPA-8LPA',
      location: 'Bangalore',
      apply: 'Apply',
    },
    {
      companyIcon:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png',
      company: 'Software Engineer II',
      packageRange: '4LPA-8LPA',
      location: 'Bangalore',
      apply: 'Apply',
    },
    {
        companyIcon:
          'https://play-lh.googleusercontent.com/eN0IexSzxpUDMfFtm-OyM-nNs44Y74Q3k51bxAMhTvrTnuA4OGnTi_fodN4cl-XxDQc',
        company: 'Senior UX designer',
        packageRange: '4LPA-8LPA',
        location: 'Bangalore',
        apply: 'Apply',
      },
      {
        companyIcon:
          'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png',
        company: 'Software Engineer II',
        packageRange: '4LPA-8LPA',
        location: 'Bangalore',
        apply: 'Apply',
      },
      {
        companyIcon:
          'https://www.odessainc.com/assets/images/newsroomodessalogo.png',
        company: 'Senior UX designer',
        packageRange: '4LPA-8LPA',
        location: 'Bangalore',
        apply: 'Apply',
      },
  ]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch('/api/internships');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInternshipLists(data);
      } catch (error) {
        console.error("Failed to fetch internships:", error);
        setInternshipLists(internshipLists);
      }
    };
  
    fetchInternships();
  }, []);
  

  return (
    <div className="internship-lists">
      <Box display='flex' flexDirection='row'>
        <Box display='flex' flexDirection='column'>
      <h2>Showing 210 jobs</h2>
      <p>Based On your Preference..</p>
      </Box>
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
      <div className="internship-grid">
        {internshipLists.map((job, index) => (
          <div className="job-card" key={index}>
            <img src={job.companyIcon} alt={job.company} />
            <div className="job-details">
              <h2>{job.company}</h2>
              <p className="job-package">
                <FaSackDollar style={{fontSize:"25px",color:"#028102"}}/> {job.packageRange} Per year
              </p>
              <p className="job-location">
              <CiLocationOn style={{fontSize:"25px",color:"blue",backgroundColor:" #e0e0e0"}}/> {job.location}
              </p>
              <button className="apply-button">{job.apply}</button>
              <FaRegBookmark />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternshipLists;
