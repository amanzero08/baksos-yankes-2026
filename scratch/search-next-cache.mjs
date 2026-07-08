import fs from 'fs';
import path from 'path';

const nextDir = 'd:\\PROJECT\\baksos_yankes_2026\\.next';

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else {
      callback(filepath);
    }
  }
}

function search() {
  console.log("=== Searching Next.js Cache ===");
  let foundCount = 0;
  walk(nextDir, (filepath) => {
    // Only search files (skip large binary files if any, but search json/html/txt)
    const ext = path.extname(filepath).toLowerCase();
    if (['.json', '.html', '.body', '.meta', '.js', '.txt'].includes(ext)) {
      const content = fs.readFileSync(filepath, 'utf-8');
      if (content.includes('BAKSOS-GPIB-2026-') || content.includes('KS-2026') || content.includes('collect')) {
        console.log(`Found candidate file: ${filepath}`);
        foundCount++;
        // Let's print matches
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('BAKSOS-GPIB-') || line.includes('KS-2026')) {
            console.log(`  Line ${index + 1}: ${line.substring(0, 300)}`);
          }
        });
      }
    }
  });
  console.log(`=== Next.js Cache Search Completed. Found ${foundCount} files. ===`);
}

search();
