import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const Topnav = () => {
  return (
    <nav className='navbar navbar-expand-lg sticky-top navbar-dark bg-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand d-flex' to='/'>
          <img
            src={Logo}
            alt=''
            width='30'
            height='30'
            className='d-inline-block align-text-top'
          />
          <span className='ps-3'>Public Square</span>
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
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/' exact>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/rules'>
                Rules
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/faq'>
                FAQ
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/about'>
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
