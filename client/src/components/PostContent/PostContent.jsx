import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

import Comments from '../Comments';
import Likes from '../Likes';

const PostContent = ({ data }) => {
  // console.log('data: ', data);
  const { account, amount, date, gravatarURL, hash, memoData, username } =
    data.post;
  // console.log('account: ', data.post.account);

  function createMarkup() {
    return { __html: memoData };
  }

  const parsedDate = parseISO(date);
  const timeToNow = formatDistanceToNow(parsedDate);
  // console.count('post content render');
  return (
    <div>
      <div className='card my-3'>
        <div className='card-body'>
          <div className='d-flex align-items-center mb-2'>
            <img src={gravatarURL} className='rounded-circle' alt='' />
            <div className='ms-3'>
              {username ? (
                <span className=''>
                  <span className='card-title'>{username}</span>
                  <span className='ms-3 text-muted'>{account}</span>
                </span>
              ) : (
                <span className=''>{account}</span>
              )}

              <div
                className='text-muted fs-smaller'
                title={parsedDate}
              >{`${timeToNow} ago`}</div>
            </div>
          </div>
          <div className='my-3' dangerouslySetInnerHTML={createMarkup()} />
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

        <Likes likes={data.likes} postId={hash} />

        <Comments comments={data.comments} postId={hash} />
      </div>
    </div>
  );
};

export default PostContent;
