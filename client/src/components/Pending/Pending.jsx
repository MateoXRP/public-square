import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const Pending = () => {
  const history = useHistory();

  const paramsString = useLocation().search;
  console.log('paramsString: ', paramsString);
  const query = new URLSearchParams(paramsString);
  const payloadId = query.get('payload');

  // add axios
  const getDataAndSaveTx = async payloadId => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(payloadId);

    try {
      const result = await axios.post(`/api/tips`, body, config);

      return result.data;
    } catch (error) {
      console.log('add tip error:', error);
    }
  };

  useEffect(() => {
    async function completeTxProcessing(payloadId) {
      console.log('payloadId: ', payloadId);
      const result = await getDataAndSaveTx(payloadId);

      return result;
    }

    if (!payloadId) {
      console.log('payload id not available');
      history.push('/');
    } else {
      const { postHash } = completeTxProcessing(payloadId);

      if (postHash) {
        history.push(`/p/${postHash}`);
      } else {
        history.push('/');
      }
    }
  }, [payloadId, history]);

  return (
    <div>
      <div>
        <div>
          <div>Processing Transaction...</div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
