import React from 'react';
import { createPortal } from 'react-dom';

const TipModal = ({
  formRef,
  recipient,
  tip = 'O.1 XRP',
  isVisible,
  hideModal
}) => {
  if (!isVisible) return null;

  const handleSubmit = () => {
    hideModal();
    formRef.current.requestSubmit();
  };

  const Recipient = recipient.username ? (
    <span>
      <span className='me-3'>{recipient.username}</span>
      <span className='fs-smaller'>{recipient.account}</span>
    </span>
  ) : (
    <span className='fs-smaller'>{recipient.account}</span>
  );

  return createPortal(
    <>
      <div className='tip-modal-overlay'></div>
      <div
        id='tipModal'
        className={`modal fade ${isVisible ? 'show' : ''} tip-modal`}
        style={isVisible ? { display: 'block' } : null}
        tabIndex='-1'
        aria-labelledby='tipModalLabel'
        aria-hidden={!isVisible}
      >
        <div className='modal-dialog'>
          <div className='modal-content tip-modal-content '>
            <div className='modal-header'>
              <h5 className='modal-title text-uppercase' id='tipModalLabel'>
                Confirm Tip
              </h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                onClick={hideModal}
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <div>
                  <span className='text-uppercase pe-3'>Recipient: </span>
                  {Recipient}
                </div>
                <span className='text-uppercase pt-3'>
                  <span className='pe-3'>Amount:</span>
                  {tip}
                </span>
              </div>
              <p>
                The specified tip will be sent from your account when this
                transaction is submitted to XRPL.
              </p>
              <p>
                Once submitted, this transaction
                <span className='text-uppercase'>
                  {' '}
                  cannot be canceled or reversed.
                </span>
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-outline-secondary btn-sm text-uppercase'
                onClick={hideModal}
              >
                <i className='bi bi-x-circle pe-2'></i>
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-outline-primary btn-sm text-uppercase'
                onClick={handleSubmit}
              >
                <i className='bi bi-arrow-right-circle pe-2'></i>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default TipModal;
