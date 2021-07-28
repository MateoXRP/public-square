import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

import { getUserAccountFromLS, clearUserInfoFromLS } from '../../util/user';

const defaultAvatarUrl =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=24&d=retro';

const UserDisplay = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [account, setAccount] = useState(getUserAccountFromLS());
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl);

  // console.log('account: ', account);
  // console.log('location: ', location);

  useEffect(() => {
    if (location.state?.account) {
      setAccount(location.state.account);
    }
  }, [location]);

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

        // console.log('user info result: ', res.data);

        return res.data;
      } catch (error) {
        console.log('error: ', error);
      }
    }

    if (account) {
      const result = getUserInfo(account);

      result
        .then(result => {
          // console.log('user info recd');

          const { gravatarURL, username } = result;

          if (username) {
            setUsername(username);
          }
          setAvatarUrl(gravatarURL);
        })
        .catch(error => console.log(error));
    }
  }, [account]);

  const handleSignout = () => {
    clearUserInfoFromLS();
    setAccount(null);
  };

  const Default = () => (
    <NavLink className='nav-link' to='/signin'>
      Sign in
    </NavLink>
  );

  const UserDropdown = () => (
    <div className='dropdown'>
      <button
        className='btn p-0 dropdown-toggle d-flex align-items-center h-100'
        id='userDropdown'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        title={account}
      >
        <img src={avatarUrl} className='rounded-circle img-thumbnail' alt='' />

        {username ? (
          <span className='fs-6 ms-2'>{username}</span>
        ) : (
          <span className='fs-6 ms-2'>••••{account.slice(-6)}</span>
        )}
      </button>
      <ul className='userDropdownMenu dropdown-menu dropdown-menu-dark text-center'>
        <li>
          <span className='dropdown-item fs-6'>{account}</span>
        </li>
        <li>
          <button
            className='dropdown-item text-uppercase'
            type='button'
            onClick={handleSignout}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );

  if (!account) return <Default />;

  return <UserDropdown />;
};

export default UserDisplay;
