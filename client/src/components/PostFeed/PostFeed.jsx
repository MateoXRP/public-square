import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostItem from '../PostItem';
import Spinner from '../Spinner';

const PostFeed = () => {
  function usePosts() {
    return useQuery('posts', async () => {
      const { data } = await axios.get('/api/posts');
      return data;
    });
  }

  const { status, data, error, isFetching } = usePosts();

  return (
    <div className='container pt-3'>
      <div className='d-flex align-items-center flex-column'>
        <header className='App-header'>
          <h2 className='display-6 text-light'>Posts</h2>
        </header>

        <div>
          {status === 'loading' ? (
            <Spinner />
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div className='container'>
                {data.posts.map(post => {
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
  );
};

export default PostFeed;
