import React from 'react';

const About = () => {
  return (
    <div className='container justify-content-center w-66 mt-3'>
      <div className='card px-3 py-5'>
        <h1 className='card-title text-center text-light pb-3'>
          Public Square
        </h1>
        <p className='card-text text-center fs-3'>
          <span>A microblog residing on the </span>
          <a
            href='https://xrpl.org/'
            target='_blank'
            rel='noreferrer'
            className='link-success'
          >
            XRPL blockchain
          </a>
        </p>
        <p className='card-text text-center fs-3'>
          <span>Created by </span>
          <a
            href='https://mg.social'
            target='_blank'
            rel='noreferrer'
            className='link-primary'
          >
            MG.Social
          </a>
        </p>
        <p className='card-text text-center fs-3'>
          <span> Powered by </span>
          <a
            href='https://xumm.app'
            target='_blank'
            rel='noreferrer'
            className='link-info'
          >
            Xumm
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
