import fs from 'fs';

async function run() {
  console.log("Fetching live dashboard cache...");
  try {
    const res = await fetch('https://yankes.amanzero.space/dashboard');
    const html = await res.text();
    fs.writeFileSync('scratch/live-dashboard.html', html);
    console.log("Saved live-dashboard.html. Checking content...");
    if (html.includes('BAKSOS-GPIB-2026-') || html.includes('KS-2026') || html.includes('Terkumpul')) {
      console.log("It seems to contain data! Let's scan for proposal numbers:");
      const matches = html.match(/BAKSOS-GPIB-2026-\d{4}/g);
      console.log("Proposal number matches:", matches ? [...new Set(matches)] : "none");
    } else {
      console.log("No data matches found in HTML.");
    }
  } catch (err) {
    console.error("Error fetching dashboard:", err);
  }

  console.log("Fetching live admin cache...");
  try {
    const res = await fetch('https://yankes.amanzero.space/admin');
    const html = await res.text();
    fs.writeFileSync('scratch/live-admin.html', html);
    console.log("Saved live-admin.html.");
    const matches = html.match(/BAKSOS-GPIB-2026-\d{4}/g);
    console.log("Admin proposal matches:", matches ? [...new Set(matches)] : "none");
  } catch (err) {
    console.error("Error fetching admin:", err);
  }
}

run();
