const getKVConfig = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
};

const callKV = async (path, options = {}) => {
  const config = getKVConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}`);
  }

  return response.json();
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const data = await callKV('mget/manifeste:reads/manifeste:downloads/manifeste:shares');

      if (!data) {
        return res.status(200).json({
          reads: null,
          downloads: null,
          shares: null,
          persisted: false,
        });
      }

      return res.status(200).json({
        reads: Number(data.result?.[0] || 0),
        downloads: Number(data.result?.[1] || 0),
        shares: Number(data.result?.[2] || 0),
        persisted: true,
      });
    }

    if (req.method === 'POST') {
      const metric = req.body?.metric;

      if (!['reads', 'downloads', 'shares'].includes(metric)) {
        return res.status(400).json({ error: 'Invalid metric' });
      }

      const data = await callKV(`incr/manifeste:${metric}`, { method: 'POST' });

      if (!data) {
        return res.status(200).json({
          count: null,
          persisted: false,
        });
      }

      return res.status(200).json({
        count: Number(data.result || 0),
        persisted: true,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to update manifeste stats',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
