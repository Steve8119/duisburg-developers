
import { createClient } from "@supabase/supabase-js";

// Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check that credentials are available
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase credentials are missing. Check your .env file."
  );
}

// Create Supabase connection
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
