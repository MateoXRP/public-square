import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import ConfirmAction from '../ConfirmAction';

import { getUserTokenFromLS } from '../../util/user';

const LikeForm = ({ postId }) => {
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
      const result = await axios.post(`/api/likes`, body, config);
      console.log('like form result', result.data);

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
      console.log('mutate success data: ', data);
      if (data?.next) {
        setXummRedirectURL(data.next.always);
      }
    }
  });

  const submitLike = async data => {
    data.postId = postId;

    const userToken = getUserTokenFromLS();
    console.log('LikeForm/userToken: ', userToken);

    if (userToken) {
      data.userToken = userToken;
    }

    console.log('submit data:', data);

    addLikeMutation.mutate(data);
  };

  // console.count('Like form render');

  return (
    <form className='p-3' ref={formRef} onSubmit={handleSubmit(submitLike)}>
      {addLikeMutation.isLoading && <Spinner />}

      <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2'>
        <Controller
          control={control}
          defaultValue='XRP'
          name='currency'
          render={() => (
            <div className='d-flex  align-items-center' role='radiogroup'>
              <label htmlFor='' className='pb-1'>
                Like fee currency:
              </label>
              <div className='form-check form-check-inline ms-3'>
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
                  0.01 XRP
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
                  1.0 MGS
                </label>
              </div>
            </div>
          )}
        />
        <ConfirmAction
          formRef={formRef}
          type='Like Post'
          iconClass='bi-hand-thumbs-up'
        />
      </div>
    </form>
  );
};

export default LikeForm;
