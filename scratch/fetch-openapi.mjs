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

async function run() {
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  const data = await response.json();
  fs.writeFileSync('scratch/openapi.json', JSON.stringify(data, null, 2));
  console.log("Exposed Tables/Views:", Object.keys(data.paths).filter(p => !p.startsWith('/rpc/')));
  console.log("Exposed RPCs:", Object.keys(data.paths).filter(p => p.startsWith('/rpc/')));
}
run();
