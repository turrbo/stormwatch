// World Weather Online - Historical weather + marine + ski + astronomy
// Uses internal AJAX endpoints that bypass premium API
const BASE = 'https://www.worldweatheronline.com';

export async function fetchHistoricalWeather(location, date) {
  // date in YYYY-MM-DD format
  const res = await fetch(`${BASE}/v2/weather.aspx/load_wxdn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: location, date }),
  });
  if (!res.ok) throw new Error(`WWO history error: ${res.status}`);
  const data = await res.json();
  return data.d ? JSON.parse(data.d) : data;
}

export async function fetchLocationSearch(query) {
  const res = await fetch(`${BASE}/search-weather.aspx/load_search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: query }),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.d ? JSON.parse(data.d) : data;
}

// Premium API endpoints (needs key, but can try with trial)
const API_BASE = 'https://api.worldweatheronline.com/premium/v1';

export async function fetchMarineWeather(lat, lon, apiKey) {
  if (!apiKey) return null;
  const url = `${API_BASE}/marine.ashx?q=${lat},${lon}&format=json&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAstronomy(lat, lon, date, apiKey) {
  if (!apiKey) return null;
  const url = `${API_BASE}/astronomy.ashx?q=${lat},${lon}&date=${date}&format=json&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}
