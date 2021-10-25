import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import ConfirmAction from '../ConfirmAction';

import submitFeeSettings from '../../config/submit-fee-settings';

import { getUserTokenFromLS } from '../../util/user';

const LikeForm = ({ postHash }) => {
  const { handleSubmit, control, reset, setValue } = useForm();

  const formRef = useRef(null);

  const [radio, setRadio] = useState('XRP');
  const [xummRedirectURL, setXummRedirectURL] = useState(null);

  useEffect(() => {
    if (xummRedirectURL) {
      window.location.assign(xummRedirectURL);
    }
  }, [xummRedirectURL]);

  const changeRadio = e => {
    setRadio(e.target.value);
    setValue('currency', e.target.value);
  };

  const addLike = async likeData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(likeData);

    try {
      const result = await axios.post(`/api/likes/tx`, body, config);

      return result.data;
    } catch (error) {
      console.log('add like error:', error);
    }
  };

  const addLikeMutation = useMutation(addLike, {
    onError: error => {
      console.log('mutate error: ', error);
      reset();
    },
    onSuccess: data => {
      if (data?.next) {
        setXummRedirectURL(data.next.always);
      }
    }
  });

  const submitLike = async data => {
    data.postHash = postHash;

    const userToken = getUserTokenFromLS();
    console.log('LikeForm/userToken: ', userToken);

    if (userToken) {
      data.userToken = userToken;
    }

    addLikeMutation.mutate(data);
  };

  return (
    <form className='p-3' ref={formRef} onSubmit={handleSubmit(submitLike)}>
      {addLikeMutation.isLoading && <Spinner />}

      <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center pt-2'>
        <Controller
          control={control}
          defaultValue='XRP'
          name='currency'
          render={() => (
            <div className='d-flex align-items-baseline' role='radiogroup'>
              <div className='currency-label text-uppercase'>
                Like fee currency:
              </div>
              <div className='ps-3'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    checked={radio === 'XRP'}
                    type='radio'
                    name='currency'
                    id='likeCurrencyXRP'
                    value='XRP'
                    onChange={e => {
                      changeRadio(e);
                    }}
                  />
                  <label className='form-check-label' htmlFor='XRP'>
                    {submitFeeSettings.XRP.label}
                  </label>
                </div>

                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    checked={radio === 'MGS'}
                    type='radio'
                    name='currency'
                    id='likeCurrencyMGS'
                    value='MGS'
                    onChange={e => {
                      changeRadio(e);
                    }}
                  />
                  <label className='form-check-label' htmlFor='MGS'>
                    {submitFeeSettings.MGS.label}
                  </label>
                </div>
              </div>
            </div>
          )}
        />
        <div className='pt-2'>
          <ConfirmAction
            formRef={formRef}
            type='Like Post'
            iconClass='bi-hand-thumbs-up'
          />
        </div>
      </div>
    </form>
  );
};

export default LikeForm;
