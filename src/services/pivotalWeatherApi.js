// Pivotal Weather - Professional NWP model visualization
const BASE = 'https://www.pivotalweather.com';
const IMG_BASE = 'https://m1o.pivotalweather.com/maps/models';

export const PV_MODELS = {
  GFS: { label: 'GFS', maxHr: 384, step: 3 },
  ECMWF: { label: 'ECMWF', maxHr: 360, step: 6 },
  'ECMWF-AIFS': { label: 'ECMWF AIFS', maxHr: 360, step: 6 },
  NAM: { label: 'NAM', maxHr: 84, step: 3 },
  'NAM-3KM': { label: 'NAM 3km', maxHr: 60, step: 1 },
  HRRR: { label: 'HRRR', maxHr: 48, step: 1 },
  ICON: { label: 'ICON', maxHr: 180, step: 3 },
  GDPS: { label: 'GEM', maxHr: 240, step: 3 },
  RDPS: { label: 'RDPS', maxHr: 84, step: 1 },
};

export const PV_PRODUCTS = {
  sfcT_pointed: 'Sfc Temp',
  mslpaNorm: 'MSLP Anomaly',
  T850_pointed: '850mb Temp',
  prcpTotl: 'Total Precip',
  sfcWind: 'Surface Wind',
  cape: 'CAPE',
  snflTotl: 'Snowfall',
  qpfPeriod: 'QPF Period',
};

export const PV_SECTORS = {
  EC: 'East CONUS',
  WC: 'West CONUS',
  US: 'CONUS',
  NA: 'N. America',
  NE: 'Northeast',
  SE: 'Southeast',
  MW: 'Midwest',
  NW: 'Northwest',
  SW: 'Southwest',
};

export function getPivotalImageUrl(model, run, fhr, product, sector = 'US') {
  const fhrPad = String(fhr).padStart(3, '0');
  return `${IMG_BASE}/${model}/${run}/${fhrPad}/${product}/${sector}.png`;
}

export async function getLatestRun(model = 'GFS') {
  try {
    const res = await fetch(`${BASE}/model.php/runs_data?model=${model}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
