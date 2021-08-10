import React, { useState } from 'react';
import axios from 'axios';

const SigninBtn = ({ onSubmitSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const submitSigninTx = async () => {
    console.log('submitting signin tx...');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const result = await axios.post(`/api/user/signin`, config);

      return result;
    } catch (error) {
      console.log('submit signin tx error: ', error);
    }
  };

  const startSignin = () => {
    setIsProcessing(true);
    const submitResponse = submitSigninTx();

    submitResponse
      .then(response => {
        setIsProcessing(false);
        // cb to parent w/response
        onSubmitSuccess(response.data.payload_uuid);
      })
      .catch(error => {
        console.log('start signin error: ', error);
        setIsProcessing(false);
      });
  };

  const handleClick = () => {
    startSignin();
    return;
  };

  return (
    <div className='signin-btn-wrapper'>
      <button
        type='button'
        className='btn btn-outline-primary text-uppercase'
        onClick={handleClick}
      >
        {isProcessing ? (
          <>
            <span
              className='spinner-grow spinner-grow-sm me-2'
              role='status'
              aria-hidden='true'
            ></span>
            <span>Processing</span>
          </>
        ) : (
          <>
            <i className='bi bi-box-arrow-in-right pe-2'></i>
            <span>Sign in</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SigninBtn;
