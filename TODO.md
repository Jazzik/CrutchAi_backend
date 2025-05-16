✅ Example: Frontend → Backend
Frontend (React/Vue/etc.):
const session = supabase.auth.getSession();
const accessToken = session.access_token;

fetch('/api/check-subscription', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
✅ Backend: Verify Token and Check Subscription
Install Supabase Admin Client (with service role key):
npm install @supabase/supabase-js
Set up Supabase Admin Client:
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
Verify token and get user info:
const authHeader = req.headers.authorization || '';
const token = authHeader.split(' ')[1];

const { data: user, error } = await supabaseAdmin.auth.getUser(token);
if (error || !user) {
  return res.status(401).json({ error: 'Unauthorized' });
}
Check subscription from your DB or Supabase table:
const { data: subscription } = await supabaseAdmin
  .from('subscriptions')
  .select('*')
  .eq('user_id', user.id)
  .maybeSingle();

if (!subscription || !subscription.is_active) {
  return res.status(403).json({ error: 'Subscription required' });
}
