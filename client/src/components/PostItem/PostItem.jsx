import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import { Link } from 'react-router-dom';

const PostItem = ({ data }) => {
  console.log('data: ', data);
  const { account, amount, date, gravatarURL, hash, memoData, username } = data;
  // console.log('account: ', data.post.account);

  function createMarkup() {
    return { __html: memoData };
  }

  const parsedDate = parseISO(date);
  const timeToNow = formatDistanceToNow(parsedDate);

  return (
    <div className='card my-3'>
      <div className='card-body'>
        <div className='mb-2'>
          <img src={gravatarURL} className='rounded' alt='' />
          {username ? (
            <span className='ms-3'>
              <span className='card-title'>{username}</span>
              <span className='ms-3 text-muted'>{account}</span>
            </span>
          ) : (
            <span className='ms-3'>{account}</span>
          )}
        </div>
        <div className='my-3' dangerouslySetInnerHTML={createMarkup()} />
      </div>

      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>
          <div className='fs-6'>
            Trans#
            <a
              href={`https://xrpscan.com/tx/${hash}`}
              target='blank'
              className='text-decoration-none ms-3 link-secondary'
              title='View on XRPSCAN'
            >
              {hash}
            </a>
          </div>
        </li>
        <li className='list-group-item'>Amount: {amount}</li>
      </ul>
      <div className='card-footer text-muted'>
        <span
          className='align-middle'
          title={parsedDate}
        >{`${timeToNow} ago`}</span>
        <Link className='btn btn-primary float-end' to={`/p/${hash}`}>
          View Post
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
