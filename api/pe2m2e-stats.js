const FIREBASE_API_KEY =
  process.env.FIREBASE_API_KEY ||
  process.env.VITE_FIREBASE_API_KEY ||
  'AIzaSyCBZF1r8K4t8lVae2Q9whhQTrzt5E1UoAo';

const FIREBASE_DATABASE_URL = (
  process.env.FIREBASE_DATABASE_URL ||
  process.env.VITE_FIREBASE_DATABASE_URL ||
  'https://charmantnyungu-default-rtdb.europe-west1.firebasedatabase.app'
).replace(/\/+$/g, '');

const METRICS = ['reads', 'downloads', 'shares'];
const STATS_PATH = 'pe2m2eStats';

let cachedAnonymousToken = null;
let cachedAnonymousTokenExpiresAt = 0;

async function getAnonymousToken() {
  if (cachedAnonymousToken && Date.now() < cachedAnonymousTokenExpiresAt - 60_000) {
    return cachedAnonymousToken;
  }

  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ returnSecureToken: true }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.idToken) {
    throw new Error(data?.error?.message || 'Anonymous Firebase auth failed');
  }

  cachedAnonymousToken = data.idToken;
  cachedAnonymousTokenExpiresAt = Date.now() + Number(data.expiresIn || 3600) * 1000;

  return cachedAnonymousToken;
}

function databaseUrl(path, token) {
  return `${FIREBASE_DATABASE_URL}/${path}.json?auth=${encodeURIComponent(token)}`;
}

async function getRemoteStats() {
  const token = await getAnonymousToken();
  const response = await fetch(databaseUrl(STATS_PATH, token), {
    headers: { Accept: 'application/json' },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || `Firebase stats read failed (${response.status})`);
  }

  return {
    reads: Number(data?.reads || 0),
    downloads: Number(data?.downloads || 0),
    shares: Number(data?.shares || 0),
  };
}

async function incrementRemoteMetric(metric) {
  const token = await getAnonymousToken();
  const url = databaseUrl(`${STATS_PATH}/${metric}`, token);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const readResponse = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Firebase-ETag': 'true',
      },
    });
    const currentValue = await readResponse.json().catch(() => 0);

    if (!readResponse.ok) {
      throw new Error(`Firebase metric read failed (${readResponse.status})`);
    }

    const etag = readResponse.headers.get('etag') || '*';
    const nextValue = Number(currentValue || 0) + 1;
    const writeResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'if-match': etag,
      },
      body: JSON.stringify(nextValue),
    });

    if (writeResponse.status === 412) {
      continue;
    }

    const savedValue = await writeResponse.json().catch(() => nextValue);

    if (!writeResponse.ok) {
      throw new Error(`Firebase metric write failed (${writeResponse.status})`);
    }

    return Number(savedValue || nextValue);
  }

  throw new Error('Firebase metric write conflict');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const stats = await getRemoteStats();

      return res.status(200).json({
        ...stats,
        persisted: true,
        source: 'firebase',
      });
    }

    if (req.method === 'POST') {
      const metric = req.body?.metric;

      if (!METRICS.includes(metric)) {
        return res.status(400).json({ error: 'Invalid metric' });
      }

      const count = await incrementRemoteMetric(metric);

      return res.status(200).json({
        count,
        persisted: true,
        source: 'firebase',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to update P-E2M2E stats',
      details: error instanceof Error ? error.message : 'Unknown error',
      persisted: false,
    });
  }
}
