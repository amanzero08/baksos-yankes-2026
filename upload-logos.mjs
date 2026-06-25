import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadLogos() {
  const logoDir = 'd:/PROJECT/baksos_yankes_2026/logo';
  const files = fs.readdirSync(logoDir);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      const filePath = path.join(logoDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      
      // Convert "Logo GMIM.png" to "logo-gmim.png"
      const fileName = file.replace(/ /g, '-').toLowerCase(); 
      
      console.log(`Uploading ${fileName}...`);
      
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(`logos/${fileName}`, fileBuffer, {
          contentType: 'image/png',
          upsert: true
        });
        
      if (error) {
        console.error(`Error uploading ${fileName}:`, error.message);
      } else {
        const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(`logos/${fileName}`);
        console.log(`Successfully uploaded ${fileName}`);
        console.log(`Public URL: ${publicUrlData.publicUrl}`);
      }
    }
  }
}

uploadLogos();
