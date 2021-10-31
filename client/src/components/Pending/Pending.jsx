import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const Pending = () => {
  const history = useHistory();

  const paramsString = useLocation().search;
  console.log('paramsString: ', paramsString);
  const query = new URLSearchParams(paramsString);
  const payloadId = query.get('payload');
  console.log('payloadId: ', payloadId);

  // add axios
  const getDataAndSaveTx = async payloadId => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ payloadId });

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

      if (result.postHash) {
        history.push(`/p/${result.postHash}`);
      } else {
        history.push('/');
      }
      return result;
    }

    if (!payloadId) {
      console.log('payload id not available');
      history.push('/');
    } else {
      completeTxProcessing(payloadId);
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
