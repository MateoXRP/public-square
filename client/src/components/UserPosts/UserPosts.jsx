import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';

import PostItem from '../PostItem';
import Spinner from '../Spinner';

const UserPosts = () => {
  let history = useHistory();
  const { location } = history;

  const { account } = useParams();
  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await axios.get(
      `/api/posts/account/${account}?cursor=${pageParam}`
    );
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery('userPosts', fetchPosts, {
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

  const isDataStale = account !== data?.pages[0].data[0].account;

  return location.state?.user ? (
    <div className='container'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <i
            className='bi bi-arrow-left-circle-fill btn-back text-primary'
            onClick={() => history.goBack()}
            title='Go Back'
          ></i>
          <header className='mt-5 mb-3'>
            <div className='card mx-auto mt-2'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img
                  src={location.state.user.gravatarURL}
                  className='rounded-circle img-thumbnail'
                  alt=''
                />
                {location.state.user.username ? (
                  <div className='d-flex flex-column ms-3'>
                    <span className='fs-3'>{location.state.user.username}</span>
                    <span className='fs-6 text-muted'>{account}</span>
                  </div>
                ) : (
                  <div className='fs-4 ms-3'>{account}</div>
                )}
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
                {data.pages.map((group, idx) => (
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
    </div>
  ) : (
    <Redirect to={'/404'} />
  );
};

export default UserPosts;
