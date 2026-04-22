import { useState } from 'react';
import { sendDeliveryRequest } from '../api/delivery';

export const useDelivery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (destination, itemCount) => {
    setLoading(true);
    setError(null);
    try {
      console.log('[useDelivery] Sending request:', { destination, itemCount });
      const result = await sendDeliveryRequest(destination, itemCount);
      console.log('[useDelivery] Request succeeded:', result);
      return result;            // let the screen decide what to do after
    } catch (err) {
      console.error('[useDelivery] Request failed:', err);
      setError(err.message);
      return null;  // return null on error so navigation doesn't happen
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};