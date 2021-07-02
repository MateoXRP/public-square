import React from 'react';

const Rules = () => {
  return (
    <div className='container p-3'>
      <h2 className='display-6 text-light'>MG.Social's Public Square Rules</h2>
      <ul className='list-group list-group-flush mt-3'>
        <li className='list-group-item'>Posting Fee: .01 XRP or 1 MGS</li>
        <li className='list-group-item'>
          Type your message in the box and hit 'Post.'
        </li>
        <li className='list-group-item'>
          Launch Xumm on your mobile device and scan the displayed QR code.
        </li>
        <li className='list-group-item'>
          Complete the transaction to submit your post.
        </li>
        <li className='list-group-item'>
          <b>NOTE:</b> Postings are PUBLIC and PERMANENT!
        </li>
        <li className='list-group-item'>
          Although the contents of your post will be saved to a permanent,
          public ledger, we reserve the right to filter posts from our front-end
          that go against our{' '}
          <a href='https://mg.social/site/terms' class='link-secondary'>
            terms and conditions
          </a>
          .
        </li>
        <li className='list-group-item'>
          Run your own version of Public Square. Visit our{' '}
          <a
            href='https://github.com/MateoXRP/PublicSquare'
            class='link-secondary'
          >
            GitHub page
          </a>{' '}
          to get started.
        </li>
      </ul>
    </div>
  );
};

export default Rules;
