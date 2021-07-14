import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import { Link } from 'react-router-dom';

const PostItem = ({ data }) => {
  const { account, amount, date, gravatarURL, hash, memoData, username } = data;
  // console.log('account: ', data.post.account);
  const parsedDate = parseISO(date);
  const timeToNow = formatDistanceToNow(parsedDate);

  return (
    <div className='card my-3'>
      <div className='card-body'>
        <div className='d-flex align-items-center mb-2'>
          <img src={gravatarURL} className='rounded-circle' alt='' />
          <div className='ms-3'>
            <Link
              to={`/u/${account}`}
              className='text-decoration-none'
              title='See all posts'
            >
              {username ? (
                <>
                  <span className='card-title'>{username}</span>
                  <span className='ms-3'>{account}</span>
                </>
              ) : (
                <span>{account}</span>
              )}
            </Link>
            <div
              className='text-muted fs-smaller'
              title={parsedDate}
            >{`${timeToNow} ago`}</div>
          </div>
        </div>

        <div
          className='post-content my-3'
          dangerouslySetInnerHTML={{ __html: memoData }}
        />
      </div>

      <div className='card-body fs-smaller'>
        <div>
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
        <div>Amount: {amount}</div>
      </div>
      <div className='card-footer text-muted'>
        <Link
          className='btn btn-outline-primary btn-sm text-uppercase'
          to={`/p/${hash}`}
        >
          <i className='bi bi-hand-index-thumb pe-2'></i>
          View Post
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
