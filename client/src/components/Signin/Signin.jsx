import React, { useState } from 'react';

import SigninBtn from '../SigninBtn';

const Signin = () => {
  const [payloadUuid, setPayloadUuid] = useState('');
  console.log('payloadUuid: ', payloadUuid);

  // callback for signin btn to return payload uuid
  const onSubmitSuccess = uuid => {
    console.log('submit success data.uuid: ', uuid);
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
            <SigninBtn onSubmitSuccess={onSubmitSuccess} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signin;
