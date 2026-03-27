// COD NEXLAB - NEXRAD radar + GOES satellite imagery
const BASE = 'https://weather.cod.edu';

// NEXRAD radar sites by region
export const RADAR_SITES = {
  KLOT: 'Chicago, IL',
  KOKX: 'New York, NY',
  KDIX: 'Philadelphia, PA',
  KLWX: 'Sterling, VA (DC)',
  KTBW: 'Tampa, FL',
  KFWS: 'Dallas/Ft. Worth, TX',
  KFFC: 'Atlanta, GA',
  KEAX: 'Kansas City, MO',
  KLSX: 'St. Louis, MO',
  KMPX: 'Minneapolis, MN',
  KPUX: 'Pueblo, CO',
  KMTX: 'Salt Lake City, UT',
  KATX: 'Seattle, WA',
  KMUX: 'San Francisco, CA',
  KVTX: 'Los Angeles, CA',
};

export function getRadarImageUrl(site, product = 'NCR', count = 1) {
  return `${BASE}/data/${site}/${product}/${count}.jpg`;
}

// GOES satellite bands
export const SAT_BANDS = {
  truecolor: { label: 'True Color', id: 'geocolor' },
  visible: { label: 'Visible', id: '02' },
  watervapor: { label: 'Water Vapor', id: '08' },
  infrared: { label: 'Infrared', id: '13' },
  airmass: { label: 'Airmass RGB', id: 'airmass' },
  sandwich: { label: 'Sandwich', id: 'sandwich' },
};

export function getSatelliteImageUrl(scale = 'goes16', sector = 'conus', band = 'geocolor', count = 1) {
  return `${BASE}/data/sat/${scale}/${sector}/${band}/${count}.jpg`;
}

export const SAT_SECTORS = {
  conus: 'CONUS',
  ne: 'Northeast',
  se: 'Southeast',
  mw: 'Midwest',
  sp: 'S. Plains',
  nw: 'Northwest',
  sw: 'Southwest',
  full: 'Full Disk',
};
