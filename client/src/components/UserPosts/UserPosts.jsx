import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostItem from '../PostItem';
import Spinner from '../Spinner';

const UserPosts = () => {
  let history = useHistory();
  const {
    location: {
      state: { user }
    }
  } = history;

  const { address } = useParams();

  function useUserPosts() {
    return useQuery('userPosts', async () => {
      const { data } = await axios.get(`/api/posts/address/${address}`);
      return data;
    });
  }

  const { status, data, error, isFetching } = useUserPosts();
  const isDataStale = address !== data?.posts[0].account;

  const Username = user.username ? (
    <div className='d-flex flex-column ms-3'>
      <span className='fs-3'>{user.username}</span>
      <span className='fs-6 text-muted'>{address}</span>
    </div>
  ) : (
    <div className='fs-4 ms-3'>{address}</div>
  );

  return (
    <div className='container'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <i
            className='bi bi-arrow-left-circle-fill btn-back text-primary'
            onClick={() => history.goBack()}
            title='Go Back'
          ></i>
          <header className='App-header'>
            <div className='card mx-auto mt-2'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img
                  src={user.gravatarURL}
                  className='rounded-circle img-thumbnail'
                  alt=''
                />
                {Username}
              </div>
            </div>
          </header>

          <div>
            {status === 'loading' || (isFetching && isDataStale) ? (
              <Spinner />
            ) : status === 'error' ? (
              <span className='text-danger'>Error: {error.message}</span>
            ) : (
              <>
                <div className=''>
                  {data.posts?.map(post => {
                    return (
                      <PostItem
                        key={post.hash.substring(post.hash.length - 8)}
                        data={post}
                      />
                    );
                  })}
                </div>

                <div>{isFetching ? <Spinner /> : ''}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
