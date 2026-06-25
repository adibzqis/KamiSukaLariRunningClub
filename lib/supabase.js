// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Leave these exactly as written here. 
// Next.js will automatically look into your .env.local file to grab the values!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);