// weather.gov NWS - Enhanced API (adds forecast discussions, stations, marine)
const BASE = 'https://api.weather.gov';
const HEADERS = { 'User-Agent': 'CommandCenter Weather App (github.com/turrbo)' };

export async function fetchPoint(lat, lon) {
  const res = await fetch(`${BASE}/points/${lat.toFixed(4)},${lon.toFixed(4)}`, { headers: HEADERS });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchForecast(gridId, gridX, gridY) {
  const res = await fetch(`${BASE}/gridpoints/${gridId}/${gridX},${gridY}/forecast`, { headers: HEADERS });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchHourlyForecast(gridId, gridX, gridY) {
  const res = await fetch(`${BASE}/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`, { headers: HEADERS });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchNearestStations(lat, lon) {
  const res = await fetch(`${BASE}/points/${lat.toFixed(4)},${lon.toFixed(4)}/stations`, { headers: HEADERS });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.features || []).slice(0, 10).map(f => ({
    id: f.properties.stationIdentifier,
    name: f.properties.name,
    elevation: f.properties.elevation?.value,
  }));
}

export async function fetchStationObservation(stationId) {
  const res = await fetch(`${BASE}/stations/${stationId}/observations/latest`, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  return data.properties || null;
}

export async function fetchForecastDiscussion(wfo) {
  const res = await fetch(`${BASE}/products/types/AFD/locations/${wfo}`, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const latest = data?.['@graph']?.[0];
  if (!latest) return null;
  const prodRes = await fetch(latest['@id'], { headers: HEADERS });
  if (!prodRes.ok) return null;
  const prod = await prodRes.json();
  return prod.productText || null;
}

export async function fetchRadarStations() {
  const res = await fetch(`${BASE}/radar/stations`, { headers: HEADERS });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.features || []).map(f => ({
    id: f.properties.id,
    name: f.properties.name,
    lat: f.geometry.coordinates[1],
    lon: f.geometry.coordinates[0],
    type: f.properties.stationType,
  }));
}
