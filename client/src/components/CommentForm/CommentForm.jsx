import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import ConfirmAction from '../ConfirmAction';

const CommentForm = ({ postId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm({ defaultValues: { currency: 'XRP' } });

  const formRef = useRef(null);

  const [radio, setRadio] = useState('XRP');
  const [xummRedirectURL, setXummRedirectURL] = useState(null);
  console.log('radio: ', radio);
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
    setValue('commentContent', '');
  };

  const addComment = async commentData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(commentData);

    try {
      const result = await axios.post(`/api/comments`, body, config);
      // console.log('add comment result:', result.data);

      return result.data;
    } catch (error) {
      console.log('add comment error:', error);
    }
  };

  const addCommentMutation = useMutation(addComment, {
    onError: error => {
      // console.log('mutate error: ', error);
      reset();
    },
    onSuccess: data => {
      // console.log('mutate success data: ', data);
      if (data?.next) {
        setXummRedirectURL(data.next.always);
      }
    }
  });

  const submitComment = async data => {
    data.postId = postId;
    console.log('submit data:', data);
    // addCommentMutation.mutate(data);
  };

  // console.log('form errors:', errors);

  return (
    <form ref={formRef} onSubmit={handleSubmit(submitComment)}>
      <div className='my-3'>
        <textarea
          className='form-control'
          id='commentContent'
          placeholder='Add a comment...'
          rows='1'
          {...register('commentContent', {
            required: 'The comment field is required',
            maxLength: {
              value: 140,
              message: 'Exceeds maximum length of 140 characters'
            }
          })}
        ></textarea>

        {errors.commentContent && (
          <div style={{ color: 'red' }}>{errors.commentContent.message}</div>
        )}

        {addCommentMutation.isLoading && <Spinner />}

        <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start pt-3'>
          <div className='me-3'>
            <button
              type='button'
              className='btn btn-outline-secondary btn-sm text-uppercase me-3'
              onClick={handleCancel}
            >
              <i className='bi bi-x-circle pe-2'></i>
              Cancel
            </button>

            <ConfirmAction
              formRef={formRef}
              type='Add Comment'
              iconClass='bi-arrow-right-circle'
            />
          </div>
          <Controller
            control={control}
            defaultValue='XRP'
            name='currency'
            render={() => (
              <div className='d-flex align-items-center' role='radiogroup'>
                <label htmlFor='' className='pb-1'>
                  Comment fee currency:
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
                    1.0 MGS
                  </label>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
