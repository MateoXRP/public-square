import React from 'react';

import { faqData } from './data-faq';

const FAQ = () => {
  const items = faqData.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className='container p-3'>
      <div className='row justify-content-center '>
        <div className='col-xs-11 col-sm-10 col-md-8'>
          <h2 className='display-6 text-center text-uppercase text-monospace text-light mt-5 mb-3'>
            FAQ
          </h2>
          <div className='accordion accordion-flush' id='accordionFAQ'>
            {items.map(item => (
              <div
                className='accordion-item bg-dark mb-3'
                key={`faq-${item.displayOrder}`}
              >
                <h2
                  className='accordion-header'
                  id={`faq-heading-${item.displayOrder}`}
                >
                  <button
                    className='accordion-button collapsed text-light bg-dark'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#faq-collapse-${item.displayOrder}`}
                    aria-expanded='false'
                    aria-controls={`faq-collapse-${item.displayOrder}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`faq-collapse-${item.displayOrder}`}
                  className='accordion-collapse collapse'
                  aria-labelledby={`faq-heading-${item.displayOrder}`}
                  data-bs-parent='#accordionFAQ'
                >
                  <div className='accordion-body faq-item-answer'>
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
