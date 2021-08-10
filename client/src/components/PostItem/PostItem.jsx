import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

const PostItem = ({ data }) => {
  let location = useLocation();

  const { account, amount, date, gravatarURL, hash, memoData, username } = data;

  const parsedDate = parseISO(date);
  const timeToNow = formatDistanceToNow(parsedDate);

  const Username = username ? (
    <div className='d-flex flex-column flex-sm-row align-items-baseline'>
      <span className='me-3'>{username}</span>
      <span className='fs-smaller'>{account}</span>
    </div>
  ) : (
    <span className='fs-smaller'>{account}</span>
  );

  return (
    <div className='card my-3'>
      <div className='card-body'>
        <div className='d-flex align-items-center mb-2'>
          <img
            src={gravatarURL}
            className='rounded-circle img-thumbnail'
            alt=''
          />
          <div className='ms-3'>
            {location.pathname === '/' ? (
              <Link
                to={{
                  pathname: `/u/${account}`,
                  state: {
                    user: {
                      account,
                      gravatarURL,
                      username
                    }
                  }
                }}
                className='text-decoration-none'
                title='See all posts'
              >
                {Username}
              </Link>
            ) : (
              <div>{Username}</div>
            )}
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
