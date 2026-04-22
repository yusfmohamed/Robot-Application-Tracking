import { apiClient } from './client';

export const sendDeliveryRequest = (destination, itemCount) => {
  return apiClient('/order', {
    method: 'POST',
    body: JSON.stringify({
      pickup: 'vending',
      destination: destination,
      itemCount: itemCount,
    }),
  });
};