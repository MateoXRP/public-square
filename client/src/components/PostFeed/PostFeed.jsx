import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostItem from '../PostItem';

const PostFeed = () => {
  function usePosts() {
    return useQuery('posts', async () => {
      const { data } = await axios.get('/api/posts');
      return data;
    });
  }

  const { status, data, error, isFetching } = usePosts();

  return (
    <div className='container bg-gray-700'>
      <header className='App-header'>
        <h2 className='display-6 text-light'>Posts</h2>
      </header>

      <div>
        {status === 'loading' ? (
          <div className='spinner-grow text-dark' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div className='container-fluid'>
              {data.posts.map(post => {
                // console.log('post: ', post);
                return (
                  <PostItem
                    key={post.hash.substring(post.hash.length - 8)}
                    data={post}
                  />
                );
              })}
              {/* <pre>{JSON.stringify(posts, null, '\t')}</pre> */}
            </div>

            <div>
              {isFetching ? (
                <div className='spinner-grow text-dark' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              ) : (
                ''
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
