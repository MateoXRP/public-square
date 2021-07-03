import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostContent from '../PostContent';
import Spinner from '../Spinner';

const Post = () => {
  const { id } = useParams();

  function usePost() {
    return useQuery('post', async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      return data;
    });
  }

  const { status, data, error, isFetching } = usePost();
  // console.log('data: ', data);
  return (
    <div className='row justify-content-center position-relative'>
      <Link to='/' className='btn-back'>
        <i className='bi bi-arrow-left-circle-fill'></i>
      </Link>
      <div className='col-xs-11 col-sm-10 col-md-8'>
        <header className='App-header text-center'>
          <h2 className='display-6 text-light'>Post</h2>
        </header>

        <div>
          {status === 'loading' ? (
            <Spinner />
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <PostContent
                key={data.post.hash.substring(data.post.hash.length - 8)}
                data={data}
              />
              <div>{isFetching ? <Spinner /> : ''}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
