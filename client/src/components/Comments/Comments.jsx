import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

const Comments = ({ comments }) => {
  console.log('comments: ', comments);
  return (
    <ul className='list-group list-group-flush'>
      {comments.map(comment => {
        const { account, date, gravatarURL, hash, memoData, username } =
          comment;
        const parsedDate = parseISO(date);
        const timeToNow = formatDistanceToNow(parsedDate);

        return (
          <li className='list-group-item' key={hash.substring(hash.length - 8)}>
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
            <div
              className='my-3'
              dangerouslySetInnerHTML={{ __html: memoData }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Comments;
