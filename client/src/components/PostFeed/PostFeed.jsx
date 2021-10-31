import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import { useInfiniteQuery } from 'react-query';

import PostForm from '../PostForm';
import PostItem from '../PostItem';
import Spinner from '../Spinner';

const PostFeed = () => {
  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await axios.get(`/api/posts?cursor=${pageParam}`);
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery('postsFeed', fetchPosts, {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    });

  if (error) {
    console.log('error: ', error);
  }

  const target = useRef();

  // infinite scroll fetch
  useEffect(() => {
    const observerOptions = {
      root: null, // Page as root
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleObserver = async entries => {
      const feedEnd = entries[0];

      if (feedEnd.isIntersecting && !isFetching && hasNextPage) {
        await fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [isFetching, hasNextPage, fetchNextPage, target]);

  return (
    <div className='container-sm content-wrapper'>
      <div className='row'>
        <header className='mt-6'>
          <h2 className='display-6 text-center text-uppercase text-monospace text-light'>
            Public Square
          </h2>
        </header>

        <PostForm />

        <div>
          {status === 'loading' ? (
            <Spinner />
          ) : status === 'error' ? (
            <span className='text-danger'>Error: {error.message}</span>
          ) : (
            <>
              {data.pages?.map((group, idx) => (
                <React.Fragment key={idx}>
                  {group.data.map(post => {
                    return (
                      <PostItem
                        key={post.hash.substring(post.hash.length - 8)}
                        data={post}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
              <div>
                <div className='d-grid mx-auto'>
                  <button
                    ref={target}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetching}
                    className={`btn btn-fluid btn-outline-info text-uppercase`}
                  >
                    {isFetching ? (
                      <>
                        <span
                          className='spinner-grow spinner-grow-sm me-2'
                          role='status'
                          aria-hidden='true'
                        ></span>
                        <span>Loading</span>
                      </>
                    ) : hasNextPage ? (
                      'Load More'
                    ) : (
                      <span>End</span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
