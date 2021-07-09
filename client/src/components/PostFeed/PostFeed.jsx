import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import PostForm from '../PostForm';
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
    <div className='row justify-content-center '>
      <div className='col-xs-11 col-sm-10 col-md-8'>
        <header className='App-header'>
          <h2 className='text-center display-6 text-light'>Posts</h2>
        </header>

        <PostForm />

        <div>
          {status === 'loading' ? (
            <Spinner />
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div className=''>
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
