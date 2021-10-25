import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import ConfirmAction from '../ConfirmAction';
import ContentEditor from '../ContentEditor';

import submitFeeSettings from '../../config/submit-fee-settings';

import { testContentLength } from '../../util/tx-data';
import { getUserTokenFromLS } from '../../util/user';

const PostForm = () => {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm({ defaultValues: { currency: 'XRP', postContent: '' } });

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

  const addPost = async postData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(postData);

    try {
      const result = await axios.post(`/api/posts/tx`, body, config);

      return result.data;
    } catch (error) {
      console.log('add post error:', error);
    }
  };

  const addPostMutation = useMutation(addPost, {
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

  const submitPost = async data => {
    const results = testContentLength(data.postContent);

    if (!results.isLengthValid) {
      errors.postContent.message = `Exceeds maximum length by approximately ${results.overage}`;
      return;
    }

    // if xumm user token, add to data
    const userToken = getUserTokenFromLS();

    if (userToken) {
      data.userToken = userToken;
    }

    console.log('submit data: ', data);

    addPostMutation.mutate(data);
  };

  const isContentEmpty = watch('postContent').length === 0;

  return (
    <div className='my-3 container-fluid'>
      <form className='card' ref={formRef} onSubmit={handleSubmit(submitPost)}>
        <div className='m-3'>
          <label htmlFor='postContent' className='form-label text-uppercase'>
            Create Post
          </label>
          <div className='position-relative'>
            <Controller
              control={control}
              name='postContent'
              defaultValue=''
              render={({ field: { onChange } }) => (
                <ContentEditor onChange={onChange} />
              )}
              rules={{
                required: 'The content editor is empty',
                minLength: 1
              }}
            />
          </div>

          {errors.postContent && (
            <div style={{ color: 'red' }}>{errors.postContent.message}</div>
          )}

          {addPostMutation.isLoading && <Spinner />}

          <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center pt-2'>
            <Controller
              control={control}
              defaultValue='XRP'
              name='currency'
              render={({ field: { onChange, value } }) => (
                <div className='d-flex align-items-baseline' role='radiogroup'>
                  <div className='currency-label text-uppercase'>
                    Posting fee currency:
                  </div>
                  <div className='ps-3'>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        checked={radio === 'XRP'}
                        type='radio'
                        name='currency'
                        id='XRP'
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
                        id='MGS'
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
                type='Create Post'
                iconClass='bi-arrow-right-circle'
                isDisabled={isContentEmpty}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
