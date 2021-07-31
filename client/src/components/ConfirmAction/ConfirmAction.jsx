import React, { useState } from 'react';

import ConfirmModal from '../ConfirmModal';

const ConfirmAction = ({ formRef, type, iconClass, isDisabled }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const showModal = e => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <>
      <button
        id={`toggleConfirmModal-${type}`}
        className='btn btn-outline-primary btn-sm w-100 text-uppercase'
        onClick={e => showModal(e)}
        disabled={isDisabled}
      >
        <i className={`bi ${iconClass} pe-2`}></i>
        {type}
      </button>

      <ConfirmModal
        formRef={formRef}
        type={type}
        isVisible={isVisible}
        hideModal={toggleModal}
      />
    </>
  );
};

export default ConfirmAction;
