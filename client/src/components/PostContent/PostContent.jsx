import React from 'react';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

import Comments from '../Comments';
import Likes from '../Likes';
import TipSection from '../TipSection';

const PostContent = ({ data }) => {
  const { account, amount, date, gravatarURL, hash, memoData, username } =
    data.post;
  // console.log('account: ', data.post.account);

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

  const author = { account, username };
  // console.count('post content render');
  return (
    <div className='card my-3'>
      <div className='card-body'>
        <div className='d-flex align-items-center mb-2'>
          <img src={gravatarURL} className='rounded-circle' alt='' />

          <div className='ms-3'>
            <Link
              to={{
                pathname: `/u/${account}`,
                state: {
                  user: {
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
        <div className='trans-number'>
          Trans#
          <a
            href={`https://xrpscan.com/tx/${hash}`}
            target='blank'
            className='text-decoration-none ms-3 link-secondary'
            title='View on XRPSCAN'
          >
            <span>{hash}</span>
          </a>
        </div>
        <div>Amount: {amount}</div>
      </div>

      <Likes likes={data.likes} postId={hash} />

      <TipSection recipient={author} postId={hash} />

      <Comments comments={data.comments} postId={hash} />
    </div>
  );
};

export default PostContent;
