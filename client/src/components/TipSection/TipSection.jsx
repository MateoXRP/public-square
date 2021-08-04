import React from 'react';

import TipForm from '../TipForm';

const TipSection = ({ recipient, postId }) => (
  <section className='card fs-6'>
    <TipForm recipient={recipient} postId={postId} />
  </section>
);

export default TipSection;
