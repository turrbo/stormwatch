// COD NEXLAB - NEXRAD radar + GOES satellite imagery
// Correct URL pattern: https://weather.cod.edu/wxdata/satellite/{scale}/{sector}/current/{sector}.{band}.jpg
const BASE = 'https://weather.cod.edu';
const WXDATA = `${BASE}/wxdata`;

// GOES satellite bands
export const SAT_BANDS = {
  '13': { label: 'Infrared', id: '13' },
  '02': { label: 'Visible', id: '02' },
  '08': { label: 'Water Vapor', id: '08' },
  airmass: { label: 'Airmass RGB', id: 'airmass' },
  sandwich: { label: 'Sandwich', id: 'sandwich' },
};

export const SAT_SCALES = {
  continental: 'Continental',
  regional: 'Regional',
};

export const SAT_SECTORS = {
  conus: 'CONUS',
  ne: 'Northeast',
  se: 'Southeast',
  mw: 'Midwest',
  sp: 'S. Plains',
  nw: 'Northwest',
  sw: 'Southwest',
};

// Returns the latest satellite image URL
export function getSatelliteImageUrl(scale = 'continental', sector = 'conus', band = '13') {
  return `${WXDATA}/satellite/${scale}/${sector}/current/${sector}.${band}.jpg`;
}

// NEXRAD radar
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

export function getRadarImageUrl(site, product = 'NCR') {
  return `${WXDATA}/nexrad/${site}/${product}/current/${site}.${product}.jpg`;
}
