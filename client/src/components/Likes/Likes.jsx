import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

import LikeForm from '../LikeForm';

const Likes = ({ likes, postHash }) => {
  console.log('likes: ', likes);
  return (
    <div className='card fs-6'>
      <div className='card-body d-flex align-items-center'>
        <div>
          <i className='bi bi-hand-thumbs-up'></i>
          <span className='text-muted ps-3'>{likes.length}</span>
          <span className='text-muted ps-3'>
            {' '}
            {likes.length === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
        {likes.length > 0 && (
          <div className='form-check form-switch ms-5'>
            <input
              className='form-check-input'
              type='checkbox'
              id='displayLikesSwitch'
              data-bs-toggle='collapse'
              data-bs-target='#likesList'
              aria-expanded='false'
              aria-controls='likesList'
            />
            <label
              className='form-check-label text-muted'
              htmlFor='displayLikesSwitch'
            >
              Display List
            </label>
          </div>
        )}
      </div>
      <div className='collapse' id='likesList'>
        <ul className='list-group list-group-flush'>
          {likes.length > 0 &&
            likes.map(like => {
              const { date, hash, user, userAccount } = like;
              const { gravatarURL, username } = user;

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
                        <div className='d-flex flex-column flex-sm-row align-items-baseline'>
                          <span className='me-3'>{username}</span>
                          <span className='fs-smaller text-muted'>
                            {userAccount}
                          </span>
                        </div>
                      ) : (
                        <span className='fs-smaller'>{userAccount}</span>
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
      <LikeForm className='align-self-end' postHash={postHash} />
    </div>
  );
};

export default Likes;
