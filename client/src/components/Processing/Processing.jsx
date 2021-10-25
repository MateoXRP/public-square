import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const Processing = () => {
  const history = useHistory();

  const paramsString = useLocation().search;
  console.log('paramsString: ', paramsString);
  const query = new URLSearchParams(paramsString);
  const txHash = query.get('hash');
  const txType = query.get('identifier');

  // add axios
  const getDataAndSaveTx = async (txHash, txType) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(txHash);

    try {
      const result = await axios.post(`/api/${txType}`, body, config);

      return result.data;
    } catch (error) {
      console.log('add tx error:', error);
    }
  };

  useEffect(() => {
    async function completeTxProcessing(txHash) {
      console.log('txHash: ', txHash);
      const result = await getDataAndSaveTx(txHash);

      return result;
    }

    if (!txHash) {
      console.log('transaction hash not available');
      history.push('/');
    } else {
      const { postHash } = completeTxProcessing(txHash);

      if (postHash) {
        history.push(`/p/${postHash}`);
      } else {
        history.push('/');
      }
    }
  }, [txHash, txType, history]);

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

export default Processing;
