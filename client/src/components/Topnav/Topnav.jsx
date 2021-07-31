import React from 'react';
import { NavLink } from 'react-router-dom';

import UserDisplay from '../UserDisplay';
import Logo from '../../assets/logo.png';

const Topnav = () => {
  return (
    <nav className='navbar navbar-expand-lg sticky-top navbar-dark bg-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand d-flex align-items-center py-0' to='/'>
          <img
            src={Logo}
            alt=''
            width='30'
            height='30'
            className='d-inline-block align-text-top'
          />
          <span className='ps-3 pb-1'>Public Square</span>
        </NavLink>

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
          <ul className='navbar-nav justify-content-end w-100 me-auto mb-2 mb-lg-0 text-uppercase'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/' exact>
                Home
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='/faq'>
                FAQ
              </NavLink>
            </li>
            <li className='nav-item me-3'>
              <NavLink className='nav-link' to='/about'>
                About
              </NavLink>
            </li>
            <li className='nav-item my-auto'>
              <UserDisplay />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
