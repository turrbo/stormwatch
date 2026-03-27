// Tropical Tidbits - NWP model maps + tropical cyclone tracking
const BASE = 'https://www.tropicaltidbits.com';

export const MODELS = {
  gfs: { label: 'GFS', maxHr: 384, step: 3 },
  ecmwf: { label: 'ECMWF', maxHr: 240, step: 6 },
  'ec-aifs': { label: 'ECMWF-AIFS', maxHr: 240, step: 6 },
  nam: { label: 'NAM', maxHr: 84, step: 3 },
  'nam4km': { label: 'NAM 4km', maxHr: 60, step: 1 },
  hrrr: { label: 'HRRR', maxHr: 48, step: 1 },
  icon: { label: 'ICON', maxHr: 180, step: 3 },
  gem: { label: 'GEM', maxHr: 240, step: 3 },
  gefs: { label: 'GEFS Ens.', maxHr: 384, step: 6 },
};

export const PRODUCTS = {
  mslp_pcpn: 'MSLP + Precip',
  accumpcpn: '24h Precip Accum',
  accumsnow: 'Snowfall',
  simrad: 'Simulated Radar',
  z500_vort: '500mb Vort.',
  z500_mslp: '500mb Heights',
  cape: 'CAPE',
  pwat: 'PWAT',
  t2m_anomaly: '2m Temp Anomaly',
  uv250: '250mb Wind',
};

export const REGIONS = {
  us: 'CONUS',
  ne: 'Northeast',
  se: 'Southeast',
  mw: 'Midwest',
  sw: 'Southwest',
  nw: 'Northwest',
  sp: 'S. Plains',
  atl: 'Atlantic',
  epac: 'E. Pacific',
  eur: 'Europe',
};

export function getModelImageUrl(model, region, product, run, fhr) {
  const fhrPad = String(fhr).padStart(3, '0');
  return `${BASE}/analysis/models/gfs/${run}/${model}_${region}_${fhrPad}_${product}.png`;
}

// Simpler approach: direct URL to the page image
export function getModelPageUrl(model = 'gfs', region = 'us', product = 'mslp_pcpn') {
  return `${BASE}/analysis/models/?model=${model}&region=${region}&pkg=${product}`;
}

export async function fetchActiveStorms() {
  try {
    const res = await fetch(`${BASE}/storminfo/`);
    if (!res.ok) return [];
    const html = await res.text();
    // Parse storm links from HTML
    const storms = [];
    const regex = /\/storminfo\/#(\w+)/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      storms.push(match[1]);
    }
    return [...new Set(storms)];
  } catch {
    return [];
  }
}

export function getSatelliteImageUrl(region = 'atl', product = 'ir', timestamp = '') {
  return `https://olorin.tropicaltidbits.com/sat/${region}/${product}/${timestamp}.jpg`;
}
