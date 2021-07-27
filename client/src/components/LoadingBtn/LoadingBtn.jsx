import React from 'react';

const LoadingBtn = ({ label = 'Loading' }) => (
  <button className='btn btn-outline-primary text-uppercase'>
    <span
      className='spinner-grow spinner-grow-sm me-2'
      role='status'
      aria-hidden='true'
    ></span>
    <span>{label}</span>
  </button>
);

export default LoadingBtn;
