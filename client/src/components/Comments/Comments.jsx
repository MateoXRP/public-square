import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

import CommentForm from '../CommentForm';

const Comments = ({ comments, postId }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm(!showForm);

  return (
    <div className='card-footer'>
      <p className='fs-6'>
        <i className='bi bi-chat-dots'></i>
        <span className='text-muted ps-3'>{comments.length}</span>
        <span className='text-muted ps-3'>
          {comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
        <button
          type='button'
          className='btn btn-outline-primary btn-sm float-end text-uppercase'
          onClick={toggleShowForm}
          autoComplete='off'
        >
          {showForm ? (
            <>
              <i className='bi bi-trash pe-2'></i>
              <span>Cancel</span>
            </>
          ) : (
            <>
              <i className='bi bi-plus-lg pe-2'></i>
              <span>Comment</span>
            </>
          )}
        </button>
      </p>

      <div>{showForm && <CommentForm postId={postId} />}</div>

      <ul className='list-group list-group-flush'>
        {comments.map(comment => {
          const { account, date, gravatarURL, hash, memoData, username } =
            comment;
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
                      <span className='fs-smaller text-muted'>{account}</span>
                    </div>
                  ) : (
                    <span className='fs-smaller'>{account}</span>
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
    </div>
  );
};

export default Comments;
