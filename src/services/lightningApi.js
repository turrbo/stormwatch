// LightningMaps / Blitzortung - Real-time global lightning data
const TILE_BASE = 'https://tiles.lightningmaps.org';
const WS_URL = 'wss://live.lightningmaps.org/';
const XHR_URL = 'https://live.lightningmaps.org/l/';

// Get lightning tile URL for map overlay (1h or 24h heatmap)
export function getLightningTileUrl(type = 5) {
  // type 5 = 1h, type 6 = 24h
  return `${TILE_BASE}/?x={x}&y={y}&z={z}&s=256&t=${type}`;
}

// Real-time lightning via WebSocket
export function connectLightningWS(onStrike, onError) {
  let ws;
  try {
    ws = new WebSocket(WS_URL);
  } catch (e) {
    onError?.(e);
    return null;
  }

  ws.onopen = () => {
    const now = Date.now();
    ws.send(JSON.stringify({ a: 6, s: now }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      // Challenge response
      if (data.k != null && data.t != null) {
        const response = (data.k * 3604) % 7081 * data.t / 100;
        ws.send(JSON.stringify({ r: response }));
        return;
      }
      // Lightning strike data
      if (data.lat != null && data.lon != null) {
        onStrike({
          lat: data.lat,
          lon: data.lon,
          time: data.time,
          delay: data.delay,
          src: data.src,
        });
      }
    } catch (e) {
      // ignore parse errors
    }
  };

  ws.onerror = (e) => onError?.(e);

  return {
    close: () => ws.readyState <= 1 && ws.close(),
  };
}

// Fallback: XHR polling for lightning data
export async function fetchRecentStrikes(since = 0) {
  const res = await fetch(`${XHR_URL}?s=${since}`);
  if (!res.ok) return [];
  return res.json();
}
