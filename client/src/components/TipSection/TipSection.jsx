import React from 'react';

import TipForm from '../TipForm';

const TipSection = ({ recipient, postHash }) => (
  <section className='card fs-6'>
    <TipForm recipient={recipient} postHash={postHash} />
  </section>
);

export default TipSection;
