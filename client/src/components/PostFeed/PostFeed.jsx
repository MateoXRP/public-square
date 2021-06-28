import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const PostFeed = () => {
  const queryClient = useQueryClient();

  function usePosts() {
    return useQuery('posts', async () => {
      const { data } = await axios.get('/api/posts/test');
      return data;
    });
  }

  const { status, data, error, isFetching } = usePosts();
  console.log('data: ', data);
  return (
    <div className='container'>
      <header className='App-header'>
        <h1>Public Square</h1>
      </header>

      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              <pre>{data.data}</pre>
            </div>
            <div>{isFetching ? 'Background Updating...' : ''}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
