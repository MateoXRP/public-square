import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const Topnav = () => {
  return (
    <nav className='navbar navbar-expand-lg sticky-top navbar-dark bg-dark'>
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

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarContent'
          aria-controls='navbarContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link ' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                FAQ
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
