const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

class SupabaseService {
  async getItems(limit = 10) {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async googleLogin(redirectTo) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    return data;
  }

  async verifyToken(token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return data;
  }

  // Add more Supabase operations here as needed
}

module.exports = new SupabaseService();
