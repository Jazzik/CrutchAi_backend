import { useEffect } from 'react';

const AuthCallback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash fragment from the URL
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        
        // Extract tokens
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (!accessToken) {
          throw new Error('No access token found');
        }

        // Store tokens in localStorage
        localStorage.setItem('supabase.access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('supabase.refresh_token', refreshToken);
        }

        // Immediately redirect to YouTube
        window.location.href = 'https://www.youtube.com';
      } catch (error) {
        console.error('Auth callback error:', error);
        window.location.href = 'https://www.youtube.com'; // Redirect to YouTube even on error
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Redirecting to YouTube...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback; 
