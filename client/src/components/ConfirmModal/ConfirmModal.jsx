import React from 'react';
import { createPortal } from 'react-dom';

const ConfirmModal = ({ formRef, type, isVisible, hideModal }) => {
  if (!isVisible) return null;

  const handleSubmit = () => {
    hideModal();
    formRef.current.requestSubmit();
  };

  return createPortal(
    <>
      <div className='confirm-modal-overlay'></div>
      <div
        id='confirmModal'
        className={`modal fade ${isVisible ? 'show' : ''} confirm-modal`}
        style={isVisible ? { display: 'block' } : null}
        tabIndex='-1'
        aria-labelledby='confirmModalLabel'
        aria-hidden={!isVisible}
      >
        <div className='modal-dialog'>
          <div className='modal-content confirm-modal-content '>
            <div className='modal-header'>
              <h5 className='modal-title' id='confirmModalLabel'>
                Confirm: <span className='text-uppercase'>{type}</span>
              </h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                onClick={hideModal}
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>
                The specified transaction fee will be sent from your account
                when this transaction is submitted to XRPL.
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

export default ConfirmModal;
