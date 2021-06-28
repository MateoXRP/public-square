import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const Topnav = () => {
  return (
    <nav className='navbar sticky-top navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img
            src={Logo}
            alt=''
            width='30'
            height='24'
            className='d-inline-block align-text-top'
          />
          <span className='ps-3'>Public Square</span>
        </Link>
      </div>
    </nav>
  );
};

export default Topnav;
