import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import ConfirmAction from '../ConfirmAction';
import ContentEditor from '../ContentEditor';

import { testContentLength } from '../../util/tx-data';
import { getUserTokenFromLS } from '../../util/user';

const CommentForm = ({ postId }) => {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm({ defaultValues: { currency: 'XRP', commentContent: '' } });

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
      console.log('mutate error: ', error);
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
    const results = testContentLength(data.commentContent);
    // console.log('test result: ', results);

    if (!results.isLengthValid) {
      errors.commentContent.message = `Exceeds maximum length by approximately ${results.overage}`;
      return;
    }
    data.postId = postId;

    const userToken = getUserTokenFromLS();
    // console.log('CommentForm/userToken: ', userToken);

    if (userToken) {
      data.userToken = userToken;
    }

    console.log('submit data:', data);

    addCommentMutation.mutate(data);
  };

  const isContentEmpty = watch('commentContent').length === 0;

  return (
    <form ref={formRef} onSubmit={handleSubmit(submitComment)}>
      <div className='my-3 position-relative'>
        <div className='position-relative'>
          <Controller
            control={control}
            name='commentContent'
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

        {errors.commentContent && (
          <div style={{ color: 'red' }}>{errors.commentContent.message}</div>
        )}

        {addCommentMutation.isLoading && <Spinner />}

        <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center pt-2'>
          <Controller
            control={control}
            defaultValue='XRP'
            name='currency'
            render={() => (
              <div className='d-flex align-items-baseline' role='radiogroup'>
                <div className='currency-label'>Comment fee currency:</div>
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
              </div>
            )}
          />
          <div className='pt-2'>
            <ConfirmAction
              formRef={formRef}
              type='Add Comment'
              iconClass='bi-arrow-right-circle'
              isDisabled={isContentEmpty}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
