import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

const Likes = ({ likes }) => {
  return (
    <div className='card fs-6'>
      <div className='card-body'>
        <i className='bi bi-hand-thumbs-up-fill'></i>
        <span className='text-muted ps-3'>{likes.length}</span>
        <span className='text-muted ps-3'>
          {' '}
          {likes.length === 1 ? 'Like' : 'Likes'}
        </span>
        {likes.length > 0 && (
          <button
            className='btn btn-sm ms-5 text-info'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#likesList'
            aria-expanded='false'
            aria-controls='likesList'
          >
            Details
          </button>
        )}
      </div>
      <div className='collapse' id='likesList'>
        <ul className='list-group list-group-flush'>
          {likes.length > 0 &&
            likes.map(like => {
              const { account, date, gravatarURL, hash, username } = like;
              const parsedDate = parseISO(date);
              const timeToNow = formatDistanceToNow(parsedDate);

              return (
                <li
                  className='list-group-item'
                  key={hash.substring(hash.length - 8)}
                >
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
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Likes;
