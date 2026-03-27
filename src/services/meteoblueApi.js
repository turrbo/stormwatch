// Meteoblue - Multi-model meteograms + dataset queries
const LOC_BASE = 'https://locationsearch.meteoblue.com';
const LOC_KEY = 'LYnNIfRrK2XWTtzw';
const DATASET_BASE = 'https://my.meteoblue.com/dataset/query';
const DATASET_KEY = '5838a18e295d';

export async function searchLocations(query) {
  const url = `${LOC_BASE}/en/server/search/query3?query=${encodeURIComponent(query)}&apikey=${LOC_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json();
}

// Meteogram image URLs - these need to be loaded via the page
export function getMeteogramUrl(lat, lon, type = 'standard') {
  // Direct embed of the meteogram page
  return `https://www.meteoblue.com/en/weather/forecast/multimodel/${lat}N${Math.abs(lon)}${lon >= 0 ? 'E' : 'W'}`;
}

// Dataset API for structured data
export async function fetchDataset(lat, lon, params = {}) {
  const query = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    apikey: DATASET_KEY,
    format: 'json',
    ...params,
  });
  const res = await fetch(`${DATASET_BASE}?${query}`);
  if (!res.ok) throw new Error(`Meteoblue dataset error: ${res.status}`);
  return res.json();
}

export const METEOGRAM_TYPES = {
  standard: { label: 'Standard', desc: '7-day overview' },
  multimodel: { label: 'Multi-Model', desc: '17 model comparison' },
  agro: { label: 'Agriculture', desc: 'Soil + precip detail' },
  airquality: { label: 'Air Quality', desc: 'Pollutants forecast' },
  snow: { label: 'Snow', desc: 'Snow depth + fresh' },
};
