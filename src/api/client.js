const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    console.log('[API] Sending request to:', url, options);
    
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    console.log('[API] Response status:', response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('[API] Success:', data);
    return data;
  } catch (error) {
    console.error('[API] Error:', error.message);
    throw error;
  }
};