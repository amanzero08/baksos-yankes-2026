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

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Missing Supabase credentials in env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const panitiaNames = [
  // Pengarah
  "Pdt. Semuel A. Z. Karinda, M.Si.",
  "dr. Griselda P. S. Aer, Sp.KP",

  // Pelaksana
  "Pdt. Jan Jona Lumanauw",
  "Pnt. Inno Wiesje Subagyono Logor (Jakarta)",
  "Ibu Desye Syul L. (Manado)",
  "Pnt. Reni Kanter",
  "drg. Lanny Ranti",
  "Pnt. Tommy Masinambouw",
  "Dkn. Denny Tewu",
  "Pnt. Adri Manafe",
  "Dkn. Inang M. K. Kaloke",
  "Sdri. Anggita Cesilia Febriana",
  "Ibu Yece Sumual",
  "Dkn. Lady Tangkere-Sondakh",
  "Ibu Karema Rumambi",

  // Sie. Acara
  "Pdt. Marthen Leiwakabessy",
  "Ibu Marcella E. Lantang",
  "Pdt. Danny Titaley",

  // Sie. Dana
  "Dkn. Yvone Wakkary",
  "Pnt. Antje Kanter",
  "Pnt. Max Roring",
  "Dkn. Ellen Tahalele",
  "Ibu Nancy Rita Damping",
  "Dkn. Vicora Van der Muur",
  "Ibu Diana Johanes",
  "Ibu Tine Sigarlaki",

  // Sie. Transportasi & Akomodasi
  "Bpk. Edward Kanter",
  "Ibu Esther Polii",
  "Dkn. Daniel F. Lolo",
  "Dkn. Okta Friyanto",
  "Pnt. Heince Tumewu",
  "Bpk. Agus Patty",

  // Sie. Logistik
  "Pnt. Sahat Sianipar",

  // Sie. Konsumsi
  "Ibu Revny Longkutoy",
  "Dkn. Wulan Sanggelorang",

  // Tim Doa
  "Pdt. Johny A. Lontoh",
  "Pdt. Sealthiel Izaak",
  "Pdt. Asachristo",
  "Pdt. Sandra Sormin - Sihasale",
  "Pdt. Betsyeba Ndoen",

  // Panitia Lokal - Minahasa Utara
  "Bpk. Edwien Moniaga",
  "Ibu Yanny Siraya Santi Papia, SIP",
  "Bpk. Saldy Jacob, S.Pd",
  "Bpk. Butje Ferry Maramis",
  "Bpk. Edward Sumual",
  "Ibu Wulan Badahura",

  // Sie. Kesehatan
  "Dkn. dr. Netty Selanno",
  "Pnt. dr. Cleve Sumeisey",
  "Dkn. Nancy Wehantouw",
  "Bpk. Toni Irawan",
  "dr. Theo Resilowi",
  "drg. Feylia",
  "drg. Iphighenia M.",

  // Panitia Lokal - Minahasa
  "Bpk. Rio Lembong",
  "Bpk. Ezra Sengkey",
  "Ibu Yanti Tumbol",
  "Bpk. Chris Rumansi",
  "Bpk. Arther Runturambi",
  "Ibu Vanda Rantung",

  // Panitia Lokal - Minahasa Tenggara
  "Bpk. Raymond Sumual, S.TEOL",
  "Ibu Yulita Ceisy Mangundap",
  "Ibu Priscillia Warouw",
  "Bpk. Lando Sumarauw",
  "Ibu Nathalia KM Mamoto",
  "Ibu Josephine Inez Rompas",
  "Ibu Paula Makalew",

  // Panitia Lokal - Minahasa (Tambahan)
  "Ibu Gracia Yubelinda Oroh"
];

async function seedPanitia() {
  console.log("Fetching existing committee members...");
  const { data: existingPanitia, error: fetchError } = await supabase
    .from('kartu_sahabat')
    .select('committee_name');

  if (fetchError) {
    console.error("Error fetching existing data:", fetchError.message);
    process.exit(1);
  }

  const existingNames = new Set(existingPanitia.map(p => p.committee_name));
  console.log(`Found ${existingNames.size} existing committee members.`);

  const newPanitia = panitiaNames.filter(name => !existingNames.has(name));

  if (newPanitia.length === 0) {
    console.log("All committee members already exist in the database. No new insertion needed.");
    return;
  }

  console.log(`Inserting ${newPanitia.length} new committee members...`);

  const recordsToInsert = newPanitia.map(name => ({
    committee_name: name,
    collected_amount: 0,
    target_amount: null,
    card_number: null
  }));

  const { data: insertedData, error: insertError } = await supabase
    .from('kartu_sahabat')
    .insert(recordsToInsert)
    .select();

  if (insertError) {
    console.error("Error inserting committee members:", insertError.message);
  } else {
    console.log(`Successfully seeded ${insertedData.length} committee members into kartu_sahabat.`);
    insertedData.forEach(p => {
      console.log(`- ${p.committee_name}`);
    });
  }
}

seedPanitia();
