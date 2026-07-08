import fs from 'fs';
import path from 'path';
import os from 'os';

const homeDir = os.homedir();
console.log("User home directory:", homeDir);

const searchPaths = [
  path.join(homeDir, 'Downloads'),
  path.join(homeDir, 'Desktop'),
  path.join(homeDir, 'Documents'),
  'C:\\Users\\ADVAN AI\\Downloads',
  'C:\\Users\\ADVAN AI\\Desktop'
];

function searchPDFs() {
  console.log("=== Searching Local PDF Downloads ===");
  const foundFiles = [];

  for (const dir of searchPaths) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory does not exist: ${dir}`);
      continue;
    }
    
    console.log(`Searching directory: ${dir}`);
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const lowerFile = file.toLowerCase();
        if (lowerFile.includes('baksos') || lowerFile.includes('gpib') || lowerFile.includes('ks-2026') || lowerFile.includes('proposal')) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isFile()) {
            console.log(`Found matching file: ${fullPath} | Size: ${stat.size} bytes | Created: ${stat.birthtime}`);
            foundFiles.push({ path: fullPath, size: stat.size, time: stat.birthtime });
          }
        }
      });
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err.message);
    }
  }

  console.log(`=== Search Finished. Found ${foundFiles.length} files. ===`);
}

searchPDFs();
