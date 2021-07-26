import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import { saveUserAccountToLS, saveUserTokenToLS } from '../../util/user';

const SigningIn = () => {
  const history = useHistory();
  const paramsString = useLocation().search;
  const query = new URLSearchParams(paramsString);
  const resultId = query.get('id');
  console.log('paramsString: ', paramsString);
  console.log('resultId: ', resultId);

  useEffect(() => {
    async function getUserInfo(payloadId) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        const res = await axios.get(`/api/user/info?id=${payloadId}`, config);

        console.log('user info result: ', res.data);

        return res.data;
      } catch (error) {
        console.log('error: ', error);
      }
    }

    if (resultId) {
      const result = getUserInfo(resultId);

      result
        .then(result => {
          console.log('user info recd');
          // get user account and token
          const {
            application: { issued_user_token },
            response: { account }
          } = result;
          // save to local storage
          saveUserAccountToLS(account);
          saveUserTokenToLS(issued_user_token);
        })
        .then(() => {
          // redirect to feed
          history.push('/');
        })
        .catch(error => console.log(error));
    }
  }, [resultId, history]);

  return (
    <div className='container p-3'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <section className='justify-content-center p-4'>
            <h3 className='display-4'>Signing in with XUMM</h3>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                After successful sign in, you will be redirected to the home
                page
              </li>
            </ul>
          </section>
          <section className='p-4'>
            <button className='btn btn-outline-primary text-uppercase'>
              <span
                className='spinner-grow spinner-grow-sm me-2'
                role='status'
                aria-hidden='true'
              ></span>
              <span>Processing</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SigningIn;
