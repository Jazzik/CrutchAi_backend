const supabaseService = require("../services/supabaseService");

class AuthController {
  async googleLogin(req, res) {
    try {
      const data = await supabaseService.googleLogin();
      res.json({
        message: "Google authentication initiated",
        url: data.url, // Supabase returns a URL for OAuth flow
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
      const { code } = req.query;
      if (!code) {
        return res.status(400).json({ error: "No code provided" });
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;

      res.json({
        message: "Successfully authenticated",
        session: data.session,
      });
    } catch (error) {
      console.error("Callback error:", error);
      res.status(500).json({
        error: "Authentication callback failed",
        details: error.message,
      });
    }
  }
}

module.exports = new AuthController();
