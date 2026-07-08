import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\ADVAN AI\\.gemini\\antigravity-ide\\brain\\';

function search() {
  const dirs = fs.readdirSync(brainDir);
  for (const dir of dirs) {
    const logFile = path.join(brainDir, dir, '.system_generated', 'logs', 'transcript.jsonl');
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf-8');
      if (content.includes('proposals') || content.includes('donations') || content.includes('kartu_sahabat')) {
        console.log(`Found candidate log: ${logFile}`);
        // Let's search lines for specific query results
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('BAKSOS-GPIB-2026-') || line.includes('KS-2026') || line.includes('kartu_sahabat_payments')) {
            console.log(`  Line ${index + 1}: ${line.substring(0, 300)}`);
          }
        });
      }
    }
  }
}

search();
