const supabaseService = require("../services/supabaseService");

class AuthController {
  async googleLogin(req, res) {
    try {
      // Get the frontend URL from environment variable or config
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const redirectTo = `${frontendUrl}/api/auth/callback`;
      
      const data = await supabaseService.googleLogin(redirectTo);
      res.json({
        message: "Google authentication initiated",
        url: data.url,
      });
    } catch (error) {
      console.error("Google login error:", error);
      res.status(500).json({
        error: "Authentication failed",
        details: error.message,
      });
    }
  }

  async handleCallback(req, res) {
    try {
      // Get the hash fragment from the URL
      const hash = req.url.split('#')[1];
      if (!hash) {
        return res.redirect('https://www.youtube.com');
      }

      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken) {
        // Store tokens in cookies if needed
        res.cookie('supabase.access_token', accessToken, { httpOnly: true });
        if (refreshToken) {
          res.cookie('supabase.refresh_token', refreshToken, { httpOnly: true });
        }
      }

      // Redirect to YouTube
      res.redirect('https://www.youtube.com');
    } catch (error) {
      console.error('Callback handling error:', error);
      // Redirect to YouTube even on error
      res.redirect('https://www.youtube.com');
    }
  }

  // Middleware to verify Supabase JWT token
  verifyToken() {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ error: "No authorization header" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
          return res.status(401).json({ error: "No token provided" });
        }

        const { data: { user }, error } = await supabaseService.verifyToken(token);
        
        if (error) throw error;
        
        // Attach user to request object
        req.user = user;
        next();
      } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({
          error: "Invalid token",
          details: error.message,
        });
      }
    };
  }
}

module.exports = new AuthController();
