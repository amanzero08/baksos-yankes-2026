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
  console.log("=== DB Update Script ===");

  // 1. Rename Yetje Sumual to Yece Sumual in kartu_sahabat
  console.log("Updating Yetje Sumual to Yece Sumual...");
  const { data: updateYetje, error: errorYetje } = await supabase
    .from('kartu_sahabat')
    .update({ committee_name: 'Ibu Yece Sumual' })
    .eq('committee_name', 'Ibu Yetje Sumual')
    .select();
  
  if (errorYetje) {
    console.error("Error updating Yetje:", errorYetje);
  } else {
    console.log("Successfully updated:", updateYetje);
  }

  // 2. Delete duplicate Marcella E. Lantang with null card_number
  console.log("Deleting duplicate Marcella E. Lantang with null card_number...");
  const { data: deleteMarcella, error: errorMarcella } = await supabase
    .from('kartu_sahabat')
    .delete()
    .eq('committee_name', 'Ibu Marcella E. Lantang')
    .is('card_number', null)
    .select();

  if (errorMarcella) {
    console.error("Error deleting duplicate Marcella:", errorMarcella);
  } else {
    console.log("Successfully deleted duplicate Marcella:", deleteMarcella);
  }

  // 3. Add new pastors (Pdt. Sandra Sormin - Sihasale and Pdt. Betsyeba Ndoen)
  const newPastors = [
    'Pdt. Sandra Sormin - Sihasale',
    'Pdt. Betsyeba Ndoen'
  ];

  for (const name of newPastors) {
    console.log(`Checking if pastor exists: ${name}...`);
    const { data: exists, error: checkError } = await supabase
      .from('kartu_sahabat')
      .select('id')
      .eq('committee_name', name)
      .maybeSingle();

    if (checkError) {
      console.error(`Error checking pastor ${name}:`, checkError);
      continue;
    }

    if (exists) {
      console.log(`Pastor ${name} already exists in database.`);
    } else {
      console.log(`Inserting pastor: ${name}...`);
      const { data: insertData, error: insertError } = await supabase
        .from('kartu_sahabat')
        .insert({
          committee_name: name,
          collected_amount: 0,
          target_amount: null,
          card_number: null
        })
        .select();

      if (insertError) {
        console.error(`Error inserting pastor ${name}:`, insertError);
      } else {
        console.log(`Successfully inserted pastor ${name}:`, insertData);
      }
    }
  }

  console.log("=== DB Update Script Completed ===");
}

run();
