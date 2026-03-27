// SpotWX - Multi-model point weather forecasts
const BASE = 'https://spotwx.com/products';

export const SPOTWX_MODELS = {
  gem_glb: { label: 'GEM Global', group: 'ECCC' },
  gem_reg: { label: 'GEM Regional', group: 'ECCC' },
  hrdps: { label: 'HRDPS 2.5km', group: 'ECCC' },
  gfs: { label: 'GFS', group: 'NOAA' },
  hrrr: { label: 'HRRR 3km', group: 'NOAA' },
  nam: { label: 'NAM 12km', group: 'NOAA' },
  ecmwf: { label: 'ECMWF IFS', group: 'ECMWF' },
  'ecmwf-aifs': { label: 'ECMWF AIFS', group: 'ECMWF' },
};

export async function fetchSpotForecast(model, lat, lon) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
  const url = `${BASE}/grib_index.php?model=${model}&lat=${lat}&lon=${lon}&tz=${encodeURIComponent(tz)}&display=table`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`SpotWX error: ${res.status}`);
  const html = await res.text();

  return parseSpotWXTable(html);
}

function parseSpotWXTable(html) {
  const rows = [];
  const tableMatch = html.match(/<table[^>]*class="[^"]*table-data[^"]*"[^>]*>([\s\S]*?)<\/table>/);
  if (!tableMatch) return rows;

  const rowMatches = tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
  for (const rm of rowMatches) {
    const cells = [];
    const cellMatches = rm[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g);
    for (const cm of cellMatches) {
      cells.push(cm[1].replace(/<[^>]+>/g, '').trim());
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}
