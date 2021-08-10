import React, { useState } from 'react';

import SigninBtn from '../SigninBtn';

const Signin = () => {
  const [payloadUuid, setPayloadUuid] = useState('');

  // callback for signin btn to return payload uuid
  const onSubmitSuccess = uuid => {
    setPayloadUuid(uuid);
  };

  // use payload uuid to redirect to xumm qr code page
  if (payloadUuid) {
    window.location.assign(`https://xumm.app/sign/${payloadUuid}`);
  }

  return (
    <div className='container p-3'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <section className='justify-content-center p-4'>
            <h2 className='display-6 text-center text-uppercase text-monospace text-light mt-5 mb-3'>
              Sign in
            </h2>
            <div className='bg-dark p-4'>
              <p>
                Sign in with XUMM and the XUMM app. This will enable push
                notifications to your device with the XUMM app.
              </p>
              <ul>
                <li className='pb-2'>Click the Sign in button.</li>
                <li className='pb-2'>Scan the QR code.</li>
                <li className='pb-2'>
                  Approve the sign in transaction on the XUMM app.
                </li>
                <li className='pb-2'>
                  After successful sign in, you will be redirected to the home
                  page
                </li>
                <li className='pb-2'>
                  <span>Learn about XUMM and the XUMM app at </span>
                  <a
                    href='https://https://xumm.dev'
                    target='_blank'
                    rel='noreferrer'
                    className='link-primary text-uppercase text-decoration-none'
                    title='xumm.dev'
                  >
                    <span> xumm.dev</span>
                  </a>
                </li>
              </ul>
              <div className='pt-3'>
                <SigninBtn onSubmitSuccess={onSubmitSuccess} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signin;
