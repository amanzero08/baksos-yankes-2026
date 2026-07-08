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
  console.log("Fetching all files in receipts/kartu-sahabat...");
  const { data, error } = await supabase.storage
    .from('receipts')
    .list('kartu-sahabat', { limit: 1000, sortBy: { column: 'name', order: 'asc' } });
  
  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log(`Found ${data.length} files in receipts/kartu-sahabat folder.`);
  fs.writeFileSync('scratch/ks-files-list.json', JSON.stringify(data, null, 2));
  console.log("Saved to scratch/ks-files-list.json");
}

run();
