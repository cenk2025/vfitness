import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('workout_programs').select('*');
  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log('DATA LENGTH:', data.length);
    console.log('DATA:', data);
  }
}
check();
