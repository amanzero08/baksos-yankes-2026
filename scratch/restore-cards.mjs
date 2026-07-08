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

const cardMappings = {
  "Pnt. Inno Wiesje Subagyono Logor (Jakarta)": "004-KS-2026",
  "Dkn. Yvone Wakkary": "003-KS-2026",
  "Ibu Nancy Rita Damping": "008-KS-2026",
  "Dkn. Ellen Tahalele": "006-KS-2026",
  "Ibu Marcella E. Lantang": "009-KS-2026",
  "drg. Lanny Ranti": "007-KS-2026"
};

async function run() {
  console.log("=== Restoring Card Numbers for Committee ===");
  
  for (const [name, cardNumber] of Object.entries(cardMappings)) {
    console.log(`Setting card ${cardNumber} for ${name}...`);
    const { data, error } = await supabase
      .from('kartu_sahabat')
      .update({ card_number: cardNumber })
      .eq('committee_name', name)
      .select();

    if (error) {
      console.error(`Error updating ${name}:`, error.message);
    } else {
      console.log(`Success:`, data);
    }
  }
  
  console.log("=== Card Numbers Restoration Completed ===");
}

run();
