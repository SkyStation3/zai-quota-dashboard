const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');
const crypto = require('crypto');

const VENDOR_DIR = path.join(__dirname, 'public', 'vendor');

if (!fs.existsSync(VENDOR_DIR)) {
  fs.mkdirSync(VENDOR_DIR, { recursive: true });
}

// Trusted React 18 production assets with verified SHA-256 integrity hashes
const downloads = [
  {
    url: 'https://unpkg.com/react@18/umd/react.production.min.js',
    file: 'react.production.min.js',
    sha256: 'd949f1c3687aedadcedac85261865f29b17cd273997e7f6b2bfc53b2f9d4c4dd'
  },
  {
    url: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    file: 'react-dom.production.min.js',
    sha256: '35f4f974f4b2bcd44da73963347f8952e341f83909e4498227d4e26b98f66f0d'
  }
];

const downloadFile = (item, dest) => {
  return new Promise((resolve, reject) => {
    const get = (targetUrl) => {
      https.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          let redirectUrl = res.headers.location;
          if (redirectUrl.startsWith('/')) {
            const parsedOriginal = url.parse(targetUrl);
            redirectUrl = `${parsedOriginal.protocol}//${parsedOriginal.host}${redirectUrl}`;
          }
          return get(redirectUrl);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to get (Status Code: ${res.statusCode})`));
        }

        const hash = crypto.createHash('sha256');
        const chunks = [];

        res.on('data', (chunk) => {
          hash.update(chunk);
          chunks.push(chunk);
        });

        res.on('end', () => {
          const computedHash = hash.digest('hex');
          if (computedHash !== item.sha256) {
            return reject(new Error(`SHA-256 integrity check failed for ${item.file}! Expected: ${item.sha256}, Got: ${computedHash}`));
          }
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(dest, buffer);
          console.log(`Downloaded & Verified [SHA-256 OK]: ${item.file}`);
          resolve();
        });
      }).on('error', (err) => {
        reject(err);
      });
    };
    get(item.url);
  });
};

const run = async () => {
  console.log('Starting downloading verified frontend vendor assets...');
  for (const item of downloads) {
    const dest = path.join(VENDOR_DIR, item.file);
    try {
      await downloadFile(item, dest);
    } catch (e) {
      console.error(`Error downloading ${item.file}:`, e.message);
    }
  }
  console.log('All downloads complete.');
};

run();
