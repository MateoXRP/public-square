import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container p-3'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8 d-flex flex-column align-items-center'>
          <i className='bi bi-emoji-frown not-found-icon'></i>
          <h2 className='not-found-header'>404 - Not Found</h2>
          <p className='not-found-text'>
            The page you requested is unavailable or may have been deleted.
          </p>

          <Link className='btn btn-outline-primary btn-lg home-button' to={`/`}>
            <i className='bi bi-house pe-3'></i>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
