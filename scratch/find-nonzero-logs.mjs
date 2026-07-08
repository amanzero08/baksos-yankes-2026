import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\ADVAN AI\\.gemini\\antigravity-ide\\brain\\';

function search() {
  const dirs = fs.readdirSync(brainDir);
  console.log(`Found ${dirs.length} brain directories.`);
  
  for (const dir of dirs) {
    const logFile = path.join(brainDir, dir, '.system_generated', 'logs', 'transcript.jsonl');
    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > 0) {
        console.log(`Log file: ${logFile} | Size: ${stats.size} bytes`);
        const content = fs.readFileSync(logFile, 'utf-8');
        // Look for typical DB output keywords
        if (content.includes('card_number') || content.includes('proposal_number') || content.includes('donations') || content.includes('kartu_sahabat')) {
          console.log(`  -> Contains DB keywords!`);
          
          // Let's parse JSON lines if possible or do line-by-line regex search
          const lines = content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('KS-2026') || line.includes('BAKSOS-GPIB-2026-') || line.includes('received_at') || line.includes('amount')) {
              // Print a snippet
              console.log(`    Line ${i+1}: ${line.substring(0, 400)}`);
            }
          }
        }
      }
    }
  }
}

search();
