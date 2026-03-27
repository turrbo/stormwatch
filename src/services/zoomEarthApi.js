// Zoom Earth - True-color satellite imagery tiles from 7 satellites
const TIMES_URL = 'https://tiles.zoom.earth/times/geocolor.json';
const TILE_BASE = 'https://tiles.zoom.earth';

let cachedTimes = null;
let cacheTs = 0;
const CACHE_MS = 3 * 60 * 1000;

export async function getSatelliteTimes() {
  const now = Date.now();
  if (cachedTimes && now - cacheTs < CACHE_MS) return cachedTimes;

  const res = await fetch(TIMES_URL, {
    headers: { Referer: 'https://zoom.earth/' },
  });
  if (!res.ok) throw new Error('Zoom Earth times API error');
  cachedTimes = await res.json();
  cacheTs = now;
  return cachedTimes;
}

export function getZoomEarthTileUrl(satellite, timestamp) {
  return `${TILE_BASE}/geocolor/${satellite}/${timestamp}/{z}/{y}/{x}.jpg`;
}

// Map satellite names to coverage areas
export const SATELLITES = {
  'goes-18': { label: 'GOES-West', region: 'Americas West' },
  'goes-16': { label: 'GOES-East', region: 'Americas East' },
  'mtg-i1': { label: 'MTG-I1', region: 'Europe/Africa' },
  'meteosat-11': { label: 'Meteosat-11', region: 'Europe/Africa' },
  'meteosat-8': { label: 'Meteosat-8', region: 'Indian Ocean' },
  'himawari-9': { label: 'Himawari-9', region: 'Asia/Pacific' },
  'gk-2a': { label: 'GK-2A', region: 'East Asia' },
};
