import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const Post = () => {
  const { id } = useParams();
  console.log('ID: ', id);
  // const queryClient = useQueryClient();

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
        <h3>Post: {id}</h3>
      </header>

      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              <pre>{JSON.stringify(data, null, '\t')}</pre>
            </div>
            <div>{isFetching ? 'Background Updating...' : ''}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
