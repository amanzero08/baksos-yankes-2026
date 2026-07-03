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

async function makeReceiptsBucketPublic() {
  console.log("Updating receipts bucket to public...");
  const { data, error } = await supabase.storage.updateBucket('receipts', {
    public: true
  });
  if (error) {
    console.error("Error updating bucket:", error);
  } else {
    console.log("Successfully updated bucket receipts to public:", data);
  }
}

makeReceiptsBucketPublic();
