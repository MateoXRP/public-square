import React from 'react';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

import { getTxDisplayAmount } from '../../util/tx-data';

import Comments from '../Comments';
import Likes from '../Likes';
import TipSection from '../TipSection';

const PostContent = ({ data }) => {
  const { author, amount, content, date, hash } = data;

  const parsedDate = parseISO(date);
  const timeToNow = formatDistanceToNow(parsedDate);
  const parsedAmount = getTxDisplayAmount(amount);

  const Username = author.username ? (
    <div className='d-flex flex-column flex-sm-row align-items-baseline'>
      <span className='me-3'>{author.username}</span>
      <span className='fs-smaller'>{author.account}</span>
    </div>
  ) : (
    <span className='fs-smaller'>{author.account}</span>
  );

  return (
    <div className='card my-3'>
      <div className='card-body'>
        <div className='d-flex align-items-center mb-2'>
          <img src={author.gravatarURL} className='rounded-circle' alt='' />

          <div className='ms-3'>
            <Link
              to={{
                pathname: `/u/${author.account}`,
                state: {
                  user: {
                    account: author.account,
                    gravatarURL: author.gravatarURL,
                    username: author.username
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
          dangerouslySetInnerHTML={{ __html: content }}
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
        <div>Amount: {parsedAmount}</div>
      </div>

      <Likes likes={data.likes} postHash={hash} />

      <TipSection recipient={author} postHash={hash} />

      <Comments comments={data.comments} postHash={hash} />
    </div>
  );
};

export default PostContent;
