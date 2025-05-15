const supabase = require("../config/supabase");

class SupabaseService {
  async getItems(limit = 10) {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async googleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.BASE_URL}/api/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  }

  async handleCallback(code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    return data;
  }

  // Add more Supabase operations here as needed
}

module.exports = new SupabaseService();
