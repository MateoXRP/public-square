import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostContent from '../PostContent';
import Spinner from '../Spinner';

const Post = () => {
  const { id } = useParams();
  console.log('ID: ', id);

  function usePost() {
    return useQuery('post', async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      return data;
    });
  }

  const { status, data, error, isFetching } = usePost();
  console.log('data: ', data);
  return (
    <div className='container'>
      <header className='App-header'>
        <h2 className='display-6 text-light'>Post</h2>
      </header>

      <div>
        {status === 'loading' ? (
          <Spinner />
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div className='container'>
              <PostContent
                key={data.post.hash.substring(data.post.hash.length - 8)}
                data={data}
              />
            </div>
            <div>{isFetching ? <Spinner /> : ''}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
