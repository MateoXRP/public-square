import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import SigninBtn from '../SigninBtn';

import { saveUserAccountToLS, saveUserTokenToLS } from '../../util/user';

const Signin = () => {
  const history = useHistory();
  const [payloadUuid, setPayloadUuid] = useState('');
  const paramsString = useLocation().search;
  const query = new URLSearchParams(paramsString);
  const resultId = query.get('id');
  console.log('paramsString: ', paramsString);
  console.log('resultId: ', resultId);
  console.log('payloadUuid: ', payloadUuid);
  // useMutation?

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

  const onSubmitSuccess = uuid => {
    // console.log('submit success data: ', data);
    console.log('submit success data.uuid: ', uuid);
    setPayloadUuid(uuid);
  };

  return (
    <div className='container p-3'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <section className='justify-content-center p-4'>
            <h3 className='display-4'>Sign in with XUMM</h3>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                This will enable push notifications to your device with the XUMM
                app.
              </li>
              <li className='list-group-item'>Click the Sign in button.</li>
              <li className='list-group-item'>Scan the QR code.</li>
              <li className='list-group-item'>
                Approve the sign in transaction on the XUMM app.
              </li>
              <li className='list-group-item'>
                After successful sign in, you will be redirected to the home
                page
              </li>
            </ul>
          </section>
          <section className='p-4'>
            {resultId ? (
              <button className='btn btn-outline-primary text-uppercase'>
                <span
                  className='spinner-grow spinner-grow-sm me-2'
                  role='status'
                  aria-hidden='true'
                ></span>
                <span>Processing</span>
              </button>
            ) : payloadUuid ? (
              <img
                src={`https://xumm.app/sign/${payloadUuid}_q.png`}
                className='rounded mx-auto d-block'
                alt='xumm QR code'
              ></img>
            ) : (
              <SigninBtn onSubmitSuccess={onSubmitSuccess} />
            )}
          </section>
          {/* <section className='p-4'>
            <div className='signin-qr-wrapper'>
              {payloadUuid ? (
                <img
                  src={`https://xumm.app/sign/${payloadUuid}_q.png`}
                  className='rounded mx-auto d-block'
                  alt='xumm QR code'
                ></img>
              ) : (
                <h5 className='mx-auto'>
                  <em>QR Code Appears Here</em>
                </h5>
              )}
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default Signin;
