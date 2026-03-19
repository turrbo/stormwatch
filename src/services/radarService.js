const RAINVIEWER_BASE = 'https://api.rainviewer.com/public/weather-maps.json';

let cachedMaps = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function getRadarFrames() {
  const now = Date.now();
  if (cachedMaps && now - cacheTime < CACHE_DURATION) return cachedMaps;

  const res = await fetch(RAINVIEWER_BASE);
  if (!res.ok) throw new Error('RainViewer API error');
  const data = await res.json();

  cachedMaps = {
    host: data.host,
    radar: data.radar?.past || [],
    nowcast: data.radar?.nowcast || [],
    satellite: data.satellite?.infrared || [],
  };
  cacheTime = now;
  return cachedMaps;
}

export function getRadarTileUrl(host, path) {
  return `${host}${path}/256/{z}/{x}/{y}/2/1_1.png`;
}

export function getSatelliteTileUrl(host, path) {
  return `${host}${path}/256/{z}/{x}/{y}/0/0_0.png`;
}
