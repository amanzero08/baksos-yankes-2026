import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually to load credentials
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function listReceipts() {
  console.log("Listing files in receipts bucket...");
  const { data: rootFiles, error: rootError } = await supabase.storage
    .from('receipts')
    .list('', { limit: 100 });

  if (rootError) {
    console.error("Error listing root files:", rootError);
  } else {
    console.log("Root files in receipts bucket:", rootFiles);
  }

  console.log("Listing files in receipts/kartu-sahabat...");
  const { data: ksFiles, error: ksError } = await supabase.storage
    .from('receipts')
    .list('kartu-sahabat', { limit: 100 });

  if (ksError) {
    console.error("Error listing kartu-sahabat files:", ksError);
  } else {
    console.log("Files in kartu-sahabat folder:", ksFiles);
  }
}

listReceipts();
