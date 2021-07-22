import React from 'react';

const Rules = () => {
  return (
    <div className='container p-3'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <h2 className='display-6 text-light'>
            MG.Social's Public Square Rules
          </h2>
          <ul className='list-group list-group-flush mt-3 bg-dark'>
            <li className='list-group-item'>Posting Fee: .01 XRP or 1 MGS</li>

            <li className='list-group-item'>
              <b>NOTE:</b> Postings are PUBLIC and PERMANENT!
            </li>
            <li className='list-group-item'>
              Although the contents of your post will be saved to a permanent,
              public ledger, we reserve the right to filter posts from our
              front-end that go against our{' '}
              <a
                href='https://mg.social/site/terms'
                target='_blank'
                rel='noreferrer'
                className='link-secondary'
              >
                terms and conditions
              </a>
              .
            </li>
            <li className='list-group-item'>
              Run your own version of Public Square. Visit our{' '}
              <a
                href='https://github.com/MateoXRP/PublicSquare'
                className='link-secondary'
              >
                GitHub page
              </a>{' '}
              to get started.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;
