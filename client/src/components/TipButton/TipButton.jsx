import React, { useState } from 'react';

import TipModal from '../TipModal';

const TipButton = ({ formRef, recipient, tip }) => {
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
        id={`toggleTipModal`}
        className='btn btn-outline-primary btn-sm text-uppercase'
        onClick={e => showModal(e)}
      >
        <div className='px-1'>
          <i className='bi bi-suit-heart pe-2'></i>
          <span>Tip Post</span>
        </div>
      </button>

      <TipModal
        formRef={formRef}
        recipient={recipient}
        tip={tip}
        isVisible={isVisible}
        hideModal={toggleModal}
      />
    </>
  );
};

export default TipButton;
