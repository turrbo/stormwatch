// Ventusky - Animated weather map tiles + fronts + pressure systems
const DATA_BASE = 'https://data.ventusky.com';
const MAIN_BASE = 'https://www.ventusky.com';
const WEBCAM_BASE = 'https://webcams.ventusky.com';

export const VENTUSKY_LAYERS = {
  temperature: 'Temperature',
  wind: 'Wind Speed',
  gusts: 'Wind Gusts',
  rain: 'Rain (1h)',
  'rain-3h': 'Rain (3h)',
  clouds: 'Cloud Cover',
  pressure: 'Pressure',
  humidity: 'Humidity',
  dewpoint: 'Dew Point',
  cape: 'CAPE',
  snowcover: 'Snow Cover',
  waves: 'Wave Height',
};

export const VENTUSKY_MODELS = {
  icon: 'ICON',
  gfs: 'GFS',
  ecmwf: 'ECMWF',
  'icon-eu': 'ICON-EU',
  hrrr: 'HRRR',
  nam: 'NAM',
  gem: 'GEM',
  ukmo: 'UKMO',
};

export function getVentuskyEmbedUrl(lat, lon, layer = 'temperature', zoom = 5) {
  return `https://www.ventusky.com/?p=${lat};${lon};${zoom}&l=${layer}`;
}

export async function searchCity(query) {
  const res = await fetch(`${MAIN_BASE}/search.php?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchNearbyWebcams(lat, lon, count = 6) {
  const res = await fetch(`${WEBCAM_BASE}/nearest?lat=${lat}&lon=${lon}&count=${count}`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchPressureSystems(model, timestamp) {
  const res = await fetch(`${DATA_BASE}/${model}/pressure/${timestamp}.json`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchWeatherFronts(model, timestamp) {
  const res = await fetch(`${DATA_BASE}/${model}/fronts/${timestamp}.json`);
  if (!res.ok) return null;
  return res.json();
}
