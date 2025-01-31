import React from 'react'
import { useEffect,useState } from 'react';
import Category from './Category';
import { MdLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
function Sidebar({handleLogout,filteredAlumniData,setFilteredAlumniData,alumniData, setAlumniData}) {

  return (
    <>
        
    <div className='sidebar'>
        <div className='sidebar-content'>
            <Category filteredAlumniData={filteredAlumniData} setFilteredAlumniData={setFilteredAlumniData} alumniData={alumniData} setAlumniData={setAlumniData} />
            

            <div className="link">
                <div className="box" onClick={() => handleLogout()}>
                <MdLogout className="icon" size={24} />
                    <h3>Log Out</h3>
                </div>
            </div>
        </div>
       
      
    </div>
    </>
  )
}

export default Sidebar
