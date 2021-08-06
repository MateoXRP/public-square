import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostContent from '../PostContent';
import Spinner from '../Spinner';

const Post = () => {
  let history = useHistory();
  const { id } = useParams();

  function usePost() {
    return useQuery('post', async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      return data;
    });
  }
  // fetch post data
  const { status, data, error, isFetching } = usePost();

  // check if existing data belongs to target post
  const isDataStale = id !== data?.post?.hash;

  return (
    <div className='container-sm content-wrapper'>
      <div className='row'>
        <header className='mt-5 mb-3'>
          <h2 className='text-center display-6 text-light'>Post</h2>
        </header>

        <div>
          {status === 'loading' || (isFetching && isDataStale) ? (
            <Spinner />
          ) : status === 'error' ? (
            <span className='text-danger'>Error: {error.message}</span>
          ) : status === 'success' && !data.post ? (
            <Redirect to={'/404'} />
          ) : (
            <div className='position-relative'>
              <i
                className='bi bi-arrow-left-circle-fill btn-back text-primary'
                onClick={() => history.goBack()}
                title='Go Back'
              ></i>
              {data?.post && <PostContent key={'post'} data={data} />}

              {isFetching ? <Spinner /> : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
