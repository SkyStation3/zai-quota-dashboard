const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from local .env file if it exists (zero-dependency env parser)
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove wrapping quotes if present
        if (value.length > 0 && (value.startsWith('"') || value.startsWith("'")) && value.endsWith(value[0])) {
          value = value.substring(1, value.length - 1);
        }
        // Save to environment
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
    console.log(`[Config] Successfully loaded local .env configurations.`);
  } catch (e) {
    console.error(`[Config Warning] Failed to read .env file: ${e.message}`);
  }
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const HISTORY_FILE = process.env.HISTORY_FILE ? path.resolve(process.env.HISTORY_FILE) : path.resolve(__dirname, 'history.json');

// Retrieve API key strictly from environment settings (no hardcoded keys committed to repo)
const API_KEY = process.env.Z_AI_API_KEY;

// MIME types lookup
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// In-memory cache for Z.ai quota API responses (15-second TTL)
let cachedQuotaData = null;
let lastQuotaFetchTime = 0;
const QUOTA_CACHE_TTL_MS = 15 * 1000;

// Helper: Fetch quota data from Z.ai API server-side with throttling/caching
const fetchQuotaData = (forceRefresh = false) => {
  const now = Date.now();
  if (!forceRefresh && cachedQuotaData && (now - lastQuotaFetchTime < QUOTA_CACHE_TTL_MS)) {
    console.log(`[Server] Returning cached quota metrics (${Math.round((now - lastQuotaFetchTime) / 1000)}s old).`);
    return Promise.resolve(cachedQuotaData);
  }

  return new Promise((resolve, reject) => {
    if (!API_KEY) {
      console.warn(`[Server Warning] API_KEY environment variable is not defined.`);
      return resolve(null); // No API Key set on server
    }
    
    console.log(`[Server] Querying Z.ai quota API...`);

    const req = https.get('https://api.z.ai/api/monitor/usage/quota/limit', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(body);
            if (parsed.success && parsed.data) {
              console.log(`[Server] Quota data successfully retrieved.`);
              cachedQuotaData = parsed.data;
              lastQuotaFetchTime = Date.now();
              return resolve(parsed.data);
            }
          } catch (e) {
            console.error(`[Server] Error parsing Z.ai JSON response.`);
          }
        } else {
          console.error(`[Server] Z.ai API returned HTTP status code: ${res.statusCode}`);
        }
        resolve(cachedQuotaData); // fallback to cached data if upstream transiently errors
      });
    });
    
    req.on('error', (err) => {
      console.error(`[Server] Z.ai API request failed: ${err.message}`);
      resolve(cachedQuotaData); // fallback to cached data
    });
    
    req.end();
  });
};

// Helper: Map units to total window minutes
const getWindowMinutes = (limit) => {
  if (limit.unit === 2) return limit.number; 
  if (limit.unit === 3) return limit.number * 60; 
  if (limit.unit === 4) return limit.number * 60 * 24; 
  if (limit.unit === 5) return limit.number * 60 * 24 * 30; 
  if (limit.unit === 6) return limit.number * 60 * 24 * 7; 
  
  if (limit.type === 'TIME_LIMIT') return 43200; 
  return limit.usage > 30000 ? 10080 : 300;
};

// Helper: Save quota metrics checkpoint into history.json file
const saveQuotaToHistoryFile = (data) => {
  if (!data || !data.limits) return;

  const limit5h = data.limits.find(l => getWindowMinutes(l) === 300);
  const limitW = data.limits.find(l => getWindowMinutes(l) === 10080);
  
  const pct5h = limit5h ? (limit5h.percentage !== undefined ? limit5h.percentage : Math.round((limit5h.currentValue / limit5h.usage) * 100)) : 0;
  const pctWeekly = limitW ? (limitW.percentage !== undefined ? limitW.percentage : Math.round((limitW.currentValue / limitW.usage) * 100)) : 0;

  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')) || [];
    } catch (e) {
      history = [];
    }
  }

  const newCheckpoint = {
    timestamp: Date.now(),
    tier: data.level || 'unknown',
    pct5h,
    pctWeekly
  };

  const lastCheckpoint = history[history.length - 1];
  const isDuplicate = lastCheckpoint && 
                      lastCheckpoint.pct5h === pct5h && 
                      lastCheckpoint.pctWeekly === pctWeekly && 
                      (Date.now() - lastCheckpoint.timestamp < 30 * 60 * 1000);

  if (!isDuplicate) {
    history.push(newCheckpoint);
    if (history.length > 500) history.shift(); // Keep last 500 entries
    const historyDir = path.dirname(HISTORY_FILE);
    if (!fs.existsSync(historyDir)) {
      fs.mkdirSync(historyDir, { recursive: true });
    }
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log(`[History Logging] Logged checkpoint to file: 5h=${pct5h}%, Weekly=${pctWeekly}%`);
  }
};

// Periodic Background Job: Fetch Z.ai quota every 1 hour and log it
const recordHistorySnapshot = () => {
  fetchQuotaData().then(data => {
    if (data) {
      saveQuotaToHistoryFile(data);
    }
  }).catch(err => {
    console.error(`[History Job Error] ${err.message}`);
  });
};

// Start background log timer (runs every 1 hour)
setInterval(recordHistorySnapshot, 60 * 60 * 1000);
// Run once immediately on server startup
recordHistorySnapshot();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Logging
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // Add standard security headers to all responses
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';");

  // Enforce strictly read-only methods
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    return;
  }

  // Server-Side Rendering of index.html
  if (pathname === '/' || pathname === '/index.html') {
    const filePath = path.resolve(PUBLIC_DIR, 'index.html');
    
    // Fetch fresh Z.ai quota data
    fetchQuotaData().then(quotaData => {
      // Proactively log history on page load if it's new
      if (quotaData) {
        saveQuotaToHistoryFile(quotaData);
      }

      // Read history log from file
      let historyData = [];
      if (fs.existsSync(HISTORY_FILE)) {
        try {
          historyData = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')) || [];
        } catch (e) {}
      }

      fs.readFile(filePath, 'utf8', (err, html) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
          return;
        }

        // Helper: Sanitize JSON for safe embedding into HTML script tags (< escaped to prevent XSS breakout)
        const safeJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

        // Inject initial data and history log directly into index.html
        const dataInjection = `
  <script>
    window.__INITIAL_DATA__ = ${safeJson(quotaData)};
    window.__HISTORY_DATA__ = ${safeJson(historyData)};
    window.__SERVER_CONFIGURED__ = ${!!API_KEY};
    window.__SERVER_TIMESTAMP__ = ${Date.now()};
  </script>`;
        
        const modifiedHtml = html.replace('</head>', `${dataInjection}\n</head>`);
        
        // Prevent caching of dynamic authenticated quota data
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(modifiedHtml);
      });
    }).catch(err => {
      console.error(`[Server Error] SSR rendering failure: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    });
    return;
  }

  // Static files server with defense-in-depth path traversal prevention
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('400 Bad Request');
    return;
  }

  const safeRelativePath = path.normalize(decodedPath.replace(/^\/+/, ''));
  const filePath = path.resolve(PUBLIC_DIR, safeRelativePath);
  const relativeToPublic = path.relative(PUBLIC_DIR, filePath);

  // Security check to avoid directory traversal (defense-in-depth)
  if (relativeToPublic.startsWith('..') || path.isAbsolute(relativeToPublic) || (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== PUBLIC_DIR)) {
    console.warn(`[Security Blocked] Attempted directory traversal block: ${pathname}`);
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

const HOST = process.env.HOST || '127.0.0.1';

// Bind to loopback address or configured HOST for security
server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`Z.ai Quota Dashboard Server running (SSR Mode) at:`);
  console.log(`http://${HOST}:${PORT}`);
  console.log(`====================================================`);
});
