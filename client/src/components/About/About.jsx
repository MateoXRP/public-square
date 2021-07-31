import React from 'react';
import format from 'date-fns/format';

const About = () => {
  const year = format(new Date(), 'yyyy');

  return (
    <div className='container-sm content-wrapper mt-3'>
      <div className='row'>
        <h2 className='display-6 text-center text-uppercase text-monospace text-light'>
          About Public Square
        </h2>

        <ul className='list-group list-group-flush mt-3 text-decoration-none bg-dark'>
          <li className='list-group-item text-center fs-4 d-flex flex-column flex-md-row justify-content-md-center'>
            <span>A microblog living on: </span>
            <a
              href='https://xrpl.org/'
              target='_blank'
              rel='noreferrer'
              className='link-success text-uppercase text-decoration-none ps-3'
            >
              XRPL blockchain
            </a>
          </li>
          <li className='list-group-item text-center fs-4'>
            <span>Powered by: </span>
            <a
              href='https://xumm.app'
              target='_blank'
              rel='noreferrer'
              className='link-info text-uppercase text-decoration-none ps-3'
            >
              Xumm
            </a>
          </li>
          <li className='list-group-item text-center fs-4'>
            <span>Created by: </span>
            <a
              href='https://mg.social'
              target='_blank'
              rel='noreferrer'
              className='link-primary text-uppercase text-decoration-none ps-3'
            >
              MG.Social
            </a>
            <div className='text-muted fs-6 mt-4'>
              &copy; {year}
              <span> MG.Social</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
