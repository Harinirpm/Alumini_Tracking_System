import React, { useState } from 'react';
import './Horizantalbar.css';
import { Link } from 'react-router-dom';
import { PiSuitcaseSimple } from "react-icons/pi";
import { CiGrid41 } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import Searchbar from '../Component/Searchbar/Searchbar';

function Horizantalbar() {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className='horinav'>
      <div className='nav-left'>
      <Searchbar
        backgroundColor="#EEEEEE"
        placeholderText="UI UX Designers"
        iconColor="black"
        width="30%"
        inputWidth="30ch"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      </div>
      <div className='nav-icons'>
      <CiGrid41 />
      <Link to='/internship-lists'><PiSuitcaseSimple /></Link>
      <Link to='/message-forum' ><RiMessage2Line /></Link>
      <IoMdNotificationsOutline />
      </div>
    </div>
  );
}

export default Horizantalbar;
