import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Ensure this is imported at the application entry point
import dotenv from 'dotenv';
dotenv.config();

function validateEnv() {
  if (!process.env.SUPABASE_URL) {
    console.error('Missing SUPABASE_URL environment variable');
    process.exit(1);
  }
  if (!process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing SUPABASE_SERVICE_KEY environment variable');
    process.exit(1);
  }
}

// Call this function during application startup
validateEnv();

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey);
