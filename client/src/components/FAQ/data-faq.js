/* 
Data for FAQ page
faqData: array of FAQ items
FAQ item properties: 
displayOrder: controls position in list
question: text string containing FAQ question
answer: JSX containing FAQ answer
*/
const faqData = [
  {
    displayOrder: 1,
    question: 'What fees does Public Square charge?',
    answer: (
      <>
        <ul className='fs-6'>
          <li>
            Public Square charges a flat fee for each post, comment and like
          </li>
          <li>The current fee is: 0.01 XRP or 1.0 MGS</li>
          <li>
            Please note this fee does not include the XRP Ledger transaction
            fee, which is usually 0.000012 XRP
          </li>
        </ul>
      </>
    )
  },
  {
    displayOrder: 2,
    question: 'How to create a Post',
    answer: (
      <>
        <div className='faq-item-header'>How to create a Post</div>
        <ul>
          <li>
            Use the editor to create your post and select the currency for the
            posting fee
          </li>
          <li>
            Submit your post and the browser will redirect and display a Xumm QR
            code
          </li>
          <li>Open the Xumm app on your mobile device and scan the QR code</li>
          <li>Approve and complete the transaction on the Xumm app</li>
          <li>
            After the transaction is processed, you will be redirected back to
            Public Square
          </li>
        </ul>
      </>
    )
  },
  {
    displayOrder: 3,
    question: 'How to modify a post or comment',
    answer: (
      <>
        <div className='faq-item-header'>
          Posts and comments cannot be modified or deleted
        </div>
        <ul>
          <li>
            Posts and comments are part of the transaction data that is saved on
            the XRP Ledger
          </li>
          <li>
            Once part of the blockchain, posts and comments are PUBLIC and
            PERMANENT
          </li>
          <li>
            We do reserve the right not to display posts or comments that
            violate our terms of service, or to comply with applicable laws and
            regulations.
          </li>
        </ul>
      </>
    )
  },
  {
    displayOrder: 4,
    question: 'How to register username',
    answer: (
      <>
        <div className='faq-item-header'>
          Register username to your XRPL account using Bithomp
        </div>
        <ul>
          <li>
            Public Square uses Bithomp.com to get the username connected to an
            account/address
          </li>
          <li>
            Visit the{' '}
            <a
              href='https://bithomp.com/username'
              target='_blank'
              rel='noreferrer'
              className='link-primary'
              title='bithomp.com'
            >
              Bithomp.com/username
            </a>{' '}
            page
          </li>
          <li>
            Use the form to connect your desired username to your XRP
            account/address
          </li>
        </ul>
      </>
    )
  },
  {
    displayOrder: 5,
    question: 'How to register email',
    answer: (
      <>
        <div className='faq-item-header'>
          Set an email address on your XRPL account
        </div>
        <ul>
          <li>
            Visit the{' '}
            <a
              className='btn btn-sm text-primary text-uppercase'
              href='https://xumm.community/'
              target='_blank'
              rel='noreferrer'
            >
              Xumm Community{' '}
            </a>
          </li>
          <li>Click on the ACCOUNT SET section</li>
          <li>Enter your email address into the email field</li>
          <li>click "Send Account Settings to Xumm" button</li>
        </ul>
      </>
    )
  },
  {
    displayOrder: 6,
    question: 'How to change avatar',
    answer: (
      <>
        <div className='faq-item-header'>
          Step 1: Setup a Gravatar image for your chosen email address
        </div>
        <ul>
          <li>
            If you already have a Gravatar image setup for your chosen email,
            skip this step
          </li>
          <li>
            Sign with{' '}
            <a
              className='btn btn-sm text-primary text-uppercase'
              href='https://en.gravatar.com/site/signup'
              target='_blank'
              rel='noreferrer'
            >
              Gravatar
            </a>
          </li>
          <li>Setup a Gravatar image for your email</li>
        </ul>

        <div className='faq-item-header'>
          Step 2: Set an email address on your XRPL account
        </div>
        <ul>
          <li>
            If your chosen email address is already associated with your XRPL
            account, skip this step
          </li>
          <li>
            Visit the{' '}
            <a
              className='btn btn-sm text-primary text-uppercase'
              href='https://xumm.community/'
              target='_blank'
              rel='noreferrer'
            >
              Xumm Community{' '}
            </a>
          </li>
          <li>Click on the ACCOUNT SET section</li>
          <li>Enter your email address into the email field</li>
          <li>click "Send Account Settings to Xumm" button</li>
        </ul>
      </>
    )
  },
  {
    displayOrder: 7,
    question: 'How to contact support',
    answer: (
      <>
        <div className='fs-6'>
          If you experience problems, or have any questions, please Public
          Square support at <a href='mailto:admin@mg.social'>admin@mg.social</a>
        </div>
      </>
    )
  },
  {
    displayOrder: 8,
    question: 'Site Terms & Conditions',
    answer: (
      <>
        <div className='fs-6'>
          <span>
            Use of this site is subject to MG.Social's terms and conditions,
            which can be found at
          </span>

          <a
            href='https://mg.social/site/terms'
            target='_blank'
            rel='noreferrer'
            className='link-primary text-decoration-none'
          >
            <span> MG.Social</span>
          </a>
        </div>
      </>
    )
  },
  {
    displayOrder: 9,
    question: 'Can I run my own version of Public Square?',
    answer: (
      <>
        <p className='lead'>~ Coming Soon ~</p>
        {/* <div className='fs-6'>
          Yes, visit
          <a
            href='https://mg.social/site/terms'
            target='_blank'
            rel='noreferrer'
            className='link-primary text-decoration-none'
          >
            <span> our GitHub repo </span>
          </a>
          for details
        </div> */}
      </>
    )
  }
];

export { faqData };
