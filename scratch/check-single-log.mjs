import fs from 'fs';
import path from 'path';

const testDir = 'C:\\Users\\ADVAN AI\\.gemini\\antigravity-ide\\brain\\cae8f38d-948c-4cec-b5e5-e67c5b5b296c';
const logsDir = path.join(testDir, '.system_generated', 'logs');

if (fs.existsSync(logsDir)) {
  console.log("Logs directory exists:", logsDir);
  const files = fs.readdirSync(logsDir);
  console.log("Files inside:", files);
  files.forEach(f => {
    const stats = fs.statSync(path.join(logsDir, f));
    console.log(`- ${f}: size = ${stats.size} bytes`);
  });
} else {
  console.log("Logs directory does not exist:", logsDir);
}
