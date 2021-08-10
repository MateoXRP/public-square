import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';

import Spinner from '../Spinner';
import TipButton from '../TipButton';

import tipSettings from '../../config/tip-settings';

import { getUserTokenFromLS } from '../../util/user';

const TipForm = ({ recipient, postId }) => {
  const { handleSubmit, control, register, reset, setValue, watch } = useForm({
    defaultValues: {
      currency: 'XRP',
      amount: tipSettings.XRP.min
    }
  });

  const formRef = useRef(null);

  const [radio, setRadio] = useState('XRP');
  const [xummRedirectURL, setXummRedirectURL] = useState(null);

  const currency = watch('currency');
  const amount = watch('amount');

  useEffect(() => {
    if (xummRedirectURL) {
      window.location.assign(xummRedirectURL);
    }
  }, [xummRedirectURL]);

  const changeRadio = e => {
    setRadio(e.target.value);
    setValue('currency', e.target.value);
  };

  const addTip = async tipData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(tipData);

    try {
      const result = await axios.post(`/api/tips`, body, config);

      return result.data;
    } catch (error) {
      console.log('add tip error:', error);
    }
  };

  const addTipMutation = useMutation(addTip, {
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

  const submitTip = async data => {
    data.postId = postId;
    data.recipientAccount = recipient.account;

    const userToken = getUserTokenFromLS();

    if (userToken) {
      data.userToken = userToken;
    }

    addTipMutation.mutate(data);
  };

  return (
    <form className='p-3' ref={formRef} onSubmit={handleSubmit(submitTip)}>
      {addTipMutation.isLoading && <Spinner />}

      <div className='row justify-content-between align-items-center'>
        <div className='col'>
          <Controller
            control={control}
            name='currency'
            render={() => (
              <div className='d-flex align-items-start' role='radiogroup'>
                <label htmlFor='' className='pb-1 text-uppercase'>
                  Tip fee currency:
                </label>
                <div className='form-check ms-3'>
                  <input
                    className='form-check-input'
                    checked={radio === 'XRP'}
                    type='radio'
                    name='currency'
                    id='tipCurrencyXRP'
                    value='XRP'
                    onChange={e => {
                      changeRadio(e);
                    }}
                  />
                  <label className='form-check-label' htmlFor='XRP'>
                    XRP
                  </label>
                </div>

                <div className='form-check ms-3'>
                  <input
                    className='form-check-input'
                    checked={radio === 'MGS'}
                    type='radio'
                    name='currency'
                    id='tipCurrencyMGS'
                    value='MGS'
                    onChange={e => {
                      changeRadio(e);
                    }}
                  />
                  <label className='form-check-label' htmlFor='MGS'>
                    MGS
                  </label>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mt-2 mb-3'>
        <div className='d-flex justify-content-start align-items-baseline'>
          <div className='text-uppercase pe-3'>Tip amount:</div>

          <input
            type='number'
            className='form-control form-control-sm tip-amount-input'
            id='tipInputAmt'
            min={tipSettings[currency].min}
            max={tipSettings[currency].max}
            step={tipSettings[currency].step}
            {...register('amount', {
              min: tipSettings[currency].min,
              max: tipSettings[currency].max,
              required: true,
              valueAsNumber: true
            })}
          />

          <span className='text-uppercase ps-2 tip-amount-currency'>
            {currency}
          </span>
        </div>

        <div className='pt-3'>
          <TipButton
            formRef={formRef}
            recipient={recipient}
            tip={`${amount} ${currency}`}
          />
        </div>
      </div>
    </form>
  );
};

export default TipForm;
