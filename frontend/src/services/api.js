const API_BASE_URL = 'https://fitness-kykn.vercel.app/api';

export async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options };
  try {
    const res = await fetch(url, config);
    const text = await res.text();
    let body = null;
    try { body = JSON.parse(text); } catch { body = text; }
    if (!res.ok) throw new Error(body?.message || `HTTP ${res.status}`);
    return body;
  } catch (err) {
    console.error('API request failed:', err);
    throw err;
  }
}

export default { request };
