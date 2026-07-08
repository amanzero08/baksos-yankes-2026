import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve('d:/PROJECT/baksos_yankes_2026/.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const ids = ['e946d13e-f197-4146-a265-4ec492e13550', '8c3afef5-5164-4205-b73b-60dbbd4c6773'];
  const { data: payments, error } = await supabase
    .from('kartu_sahabat_payments')
    .select('*')
    .in('kartu_sahabat_id', ids);
  
  console.log("Error:", error);
  console.log("Payments for Marcella IDs:", payments);
}
run();
