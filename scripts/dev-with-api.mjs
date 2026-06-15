import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 3000);

function loadEnvFile(fileName) {
  const filePath = path.join(root, fileName);
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

    const [key, ...parts] = trimmed.split('=');
    const value = parts.join('=').replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const apiRoutes = new Map([
  ['/api/course-package-payment', '../api/course-package-payment.js'],
  ['/api/course-package-status', '../api/course-package-status.js'],
  ['/api/course-package-file', '../api/course-package-file.js'],
  ['/api/manifeste-stats', '../api/manifeste-stats.js'],
  ['/api/pe2m2e-stats', '../api/pe2m2e-stats.js'],
]);

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return undefined;

  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    return JSON.parse(raw);
  }

  return raw;
}

function decorateResponse(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    res.end(JSON.stringify(payload));
  };
  return res;
}

async function handleApi(req, res, url) {
  const route = apiRoutes.get(url.pathname);
  if (!route) return false;

  try {
    const module = await import(route);
    req.query = Object.fromEntries(url.searchParams.entries());
    req.body = await readBody(req);
    await module.default(req, decorateResponse(res));
  } catch (error) {
    console.error(`API error on ${url.pathname}`, error);
    decorateResponse(res).status(500).json({
      error: error instanceof Error ? error.message : 'Erreur API locale.',
    });
  }

  return true;
}

const vite = await createViteServer({
  root,
  server: {
    middlewareMode: true,
    host: '0.0.0.0',
  },
  appType: 'spa',
});

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || `localhost:${port}`}`);

  if (await handleApi(req, res, url)) {
    return;
  }

  vite.middlewares(req, res);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Dev server with API ready: http://localhost:${port}/`);
});
