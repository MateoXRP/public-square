import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const defaultAvatarUrl =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=24&d=retro';

const UserPostsHeader = ({ account }) => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl);

  useEffect(() => {
    async function getUserInfo(account) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        const res = await axios.get(
          `/api/user/info?account=${account}`,
          config
        );

        return res.data;
      } catch (error) {
        console.log('error: ', error);
      }
    }

    if (location.state?.user) {
      const { gravatarURL, username } = location.state.user;
      setUsername(username);
      setAvatarUrl(gravatarURL);
    } else {
      const result = getUserInfo(account);

      result
        .then(result => {
          const { gravatarURL, username } = result;

          if (username) {
            setUsername(username);
          }
          setAvatarUrl(gravatarURL);
        })
        .catch(error => console.log(error));
    }
  }, [account, location]);

  return (
    <header className='mt-6 mb-3'>
      <div className='card user-posts-header'>
        <div className='card-body mb-3 d-flex flex-column flex-md-row align-items-center justify-content-center'>
          <img
            src={avatarUrl}
            className='rounded-circle img-thumbnail'
            alt=''
          />
          {username ? (
            <div className='d-flex flex-column align-items-center align-items-md-start ms-3'>
              <span className='fs-3'>{username}</span>
              <span className='fs-6 text-muted'>{account}</span>
            </div>
          ) : (
            <div className='fs-4 ms-3'>{account}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserPostsHeader;
