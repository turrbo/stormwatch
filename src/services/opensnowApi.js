// OpenSnow - Ski resort snow conditions + avalanche forecasts
const BASE = 'https://opensnow.com/mtn';
const API_KEY = '60600760edf827a75df71f712b71e3f3';

function mtnUrl(slug, endpoint) {
  return `${BASE}/${slug}/${endpoint}?v=1&api_key=${API_KEY}`;
}

export async function fetchSnowSummary(slug) {
  const res = await fetch(mtnUrl(slug, 'snow-summary'));
  if (!res.ok) throw new Error(`OpenSnow error: ${res.status}`);
  return res.json();
}

export async function fetchResortForecast(slug) {
  const res = await fetch(mtnUrl(slug, 'forecast'));
  if (!res.ok) throw new Error(`OpenSnow forecast error: ${res.status}`);
  return res.json();
}

export async function fetchSnowReport(slug) {
  const res = await fetch(mtnUrl(slug, 'snow-report'));
  if (!res.ok) throw new Error(`OpenSnow report error: ${res.status}`);
  return res.json();
}

export async function fetchAvalanche(slug) {
  const res = await fetch(mtnUrl(slug, 'avalanche'));
  if (!res.ok) return null;
  return res.json();
}

export async function searchResorts(query) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&v=1&api_key=${API_KEY}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || data || [];
}

export const POPULAR_RESORTS = [
  { slug: 'vail', name: 'Vail', state: 'CO' },
  { slug: 'park-city', name: 'Park City', state: 'UT' },
  { slug: 'mammoth-mountain', name: 'Mammoth Mountain', state: 'CA' },
  { slug: 'jackson-hole', name: 'Jackson Hole', state: 'WY' },
  { slug: 'big-sky', name: 'Big Sky', state: 'MT' },
  { slug: 'steamboat', name: 'Steamboat', state: 'CO' },
  { slug: 'killington', name: 'Killington', state: 'VT' },
  { slug: 'alta', name: 'Alta', state: 'UT' },
  { slug: 'telluride', name: 'Telluride', state: 'CO' },
  { slug: 'aspen-snowmass', name: 'Aspen Snowmass', state: 'CO' },
  { slug: 'squaw-valley', name: 'Palisades Tahoe', state: 'CA' },
  { slug: 'snowbird', name: 'Snowbird', state: 'UT' },
];
