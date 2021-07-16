import React, { useState } from 'react';

import ConfirmModal from '../ConfirmModal';

const ConfirmAction = ({ formRef, type, iconClass }) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log('isVisible: ', isVisible);

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
        id='toggleConfirmModal'
        className='btn btn-outline-primary btn-sm text-uppercase'
        onClick={e => showModal(e)}
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
