const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const authenticatedFetch = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem('supabase.access_token');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('supabase.access_token');
    localStorage.removeItem('supabase.refresh_token');
    window.location.href = '/auth/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

export const loginWithGoogle = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`);
    const data = await response.json();
    
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No authentication URL received');
    }
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
}; 
