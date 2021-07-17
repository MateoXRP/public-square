import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import ConfirmAction from '../ConfirmAction';

const PostForm = () => {
  const {
    register,
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

  const handleCancel = () => {
    setValue('postContent', '');
  };

  const addPost = async postData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(postData);

    try {
      const result = await axios.post(`/api/posts`, body, config);
      console.log('post form result', result.data);

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
      console.log('mutate success data: ', data);
      if (data?.next) {
        setXummRedirectURL(data.next.always);
      }
    }
  });

  const submitPost = async data => {
    // console.log('submit data:', data);
    addPostMutation.mutate(data);
  };

  const isContentEmpty = watch('postContent').length === 0;

  return (
    <div className='card my-3 container-fluid'>
      <form ref={formRef} onSubmit={handleSubmit(submitPost)}>
        <div className='my-3'>
          <label htmlFor='postContent' className='form-label text-uppercase'>
            Create Post
          </label>
          <div className='position-relative'>
            <textarea
              className='form-control'
              id='postContent'
              placeholder='Enter your post here...'
              rows='3'
              {...register('postContent', {
                required: 'The post content field is required',
                minLength: 1,
                maxLength: {
                  value: 280,
                  message: 'Exceeds maximum length of 280 characters'
                }
              })}
            ></textarea>
            <span
              type='button'
              onClick={handleCancel}
              className={`btn-clear-inline ${
                isContentEmpty ? 'invisible' : ''
              }`}
            >
              <i className={`bi bi-x-circle`}></i>
            </span>
          </div>

          {errors.postContent && (
            <div style={{ color: 'red' }}>{errors.postContent.message}</div>
          )}

          {addPostMutation.isLoading && <Spinner />}

          <div className='d-flex align-items-center justify-content-between pt-2'>
            <Controller
              control={control}
              defaultValue='XRP'
              name='currency'
              render={({ field: { onChange, value } }) => (
                <div className='d-flex align-items-center' role='radiogroup'>
                  <label htmlFor='' className='pb-1'>
                    Posting fee currency:
                  </label>
                  <div className='form-check form-check-inline ms-3'>
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
                      0.01 XRP
                    </label>
                  </div>

                  <div className='form-check form-check-inline '>
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
                      1.0 MGS
                    </label>
                  </div>
                </div>
              )}
            />
            <div className='float-end'>
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
