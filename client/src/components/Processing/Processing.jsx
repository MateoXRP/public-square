import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const Processing = () => {
  const history = useHistory();

  const paramsString = useLocation().search;
  console.log('paramsString: ', paramsString);
  const query = new URLSearchParams(paramsString);
  const txHash = query.get('hash');
  const identifier = query.get('identifier').split('-');
  const txType = identifier[0];

  // add axios
  const getDataAndSaveTx = async (txHash, txType) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ txHash });

    try {
      const result = await axios.post(`/api/${txType}`, body, config);

      return result.data;
    } catch (error) {
      console.log('add tx error:', error);
    }
  };

  useEffect(() => {
    async function completeTxProcessing(txHash, txType) {
      const result = await getDataAndSaveTx(txHash, txType);

      if (result.postHash) {
        history.push(`/p/${result.postHash}`);
      } else {
        history.push('/');
      }
      return result;
    }

    if (!txHash) {
      history.push('/');
    } else {
      completeTxProcessing(txHash, txType);
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
