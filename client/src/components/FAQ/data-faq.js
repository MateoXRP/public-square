// data for FAQ
// array of objects
// { displayOrder, question, answer }

const faqData = [
  {
    displayOrder: 1,
    question: 'How to create a Post',
    answer: (
      <div className='px-2 py-3'>
        <h5>How to create a Post</h5>
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
      </div>
    )
  },
  {
    displayOrder: 2,
    question: 'How to modify a post or comment',
    answer: (
      <div className='px-2 py-3'>
        <h5>Posts and comments cannot be modified or deleted</h5>
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
      </div>
    )
  },
  {
    displayOrder: 3,
    question: 'How to register username',
    answer: (
      <div className='px-2 py-3'>
        <h5>Register username to your XRPL account using Bithomp</h5>
        <ul>
          <li>
            Public Square uses Bithomp.com to get the username connected to an
            address
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
            Use the form to connect your desired username to your XRP address
          </li>
        </ul>
      </div>
    )
  },
  {
    displayOrder: 4,
    question: 'How to register email',
    answer: (
      <div className='px-2 py-3'>
        <h5>Set an email address on your XRPL account</h5>
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
      </div>
    )
  },
  {
    displayOrder: 5,
    question: 'How to change avatar',
    answer: (
      <div className='px-2 py-3'>
        <h5>Step 1: Setup a Gravatar image for your chosen email address</h5>
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

        <h5>Step 2: Set an email address on your XRPL account</h5>
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
      </div>
    )
  },
  {
    displayOrder: 6,
    question: 'How to contact support',
    answer: (
      <div className='px-2 py-3'>
        <h5>
          If you experience problems, or have any questions, please Public
          Square support at <a href='mailto:admin@mg.social'>admin@mg.social</a>
        </h5>
      </div>
    )
  }
];

export { faqData };
