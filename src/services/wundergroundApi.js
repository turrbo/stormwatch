// Weather Underground / The Weather Company - PWS hyper-local data
const BASE = 'https://api.weather.com';
const API_KEY = 'e1f10a1e78da46f5b10a1e78da96f525';

export async function fetchNearbyPWS(lat, lon) {
  const geocode = `${lat},${lon}`;
  const url = `${BASE}/v3/location/near?geocode=${geocode}&product=pws&format=json&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data?.location?.stationId?.map((id, i) => ({
    stationId: id,
    distanceMi: data.location.distanceMi?.[i],
    neighborhood: data.location.neighborhood?.[i],
    city: data.location.city?.[i],
    state: data.location.state?.[i],
  })) || [];
}

export async function fetchPWSCurrent(stationId) {
  const url = `${BASE}/v2/pws/observations/current?stationId=${stationId}&format=json&units=e&numericPrecision=decimal&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WU PWS error: ${res.status}`);
  const data = await res.json();
  return data.observations?.[0] || null;
}

export async function fetchPWSHistory(stationId, date) {
  // date in YYYYMMDD format
  const url = `${BASE}/v2/pws/history/hourly?stationId=${stationId}&format=json&units=e&numericPrecision=decimal&date=${date}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.observations || [];
}

export function getRadarTileUrl(ts) {
  return `${BASE}/v3/TileServer/tile?product=twcRadarMosaic&ts=${ts}&x={x}&y={y}&z={z}&apiKey=${API_KEY}`;
}
