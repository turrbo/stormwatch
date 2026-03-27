// NOAA WPC - Surface analysis, QPF, ERO, winter weather products
const BASE = 'https://www.wpc.ncep.noaa.gov';

export const SURFACE_ANALYSIS = {
  current: `${BASE}/sfc/namussfcwbg.gif`,
  namussfc: (hh) => `${BASE}/sfc/namussfc${hh}wbg.gif`,
};

export const QPF_PRODUCTS = {
  day1_24h: `${BASE}/qpf/p24i.gif`,
  day2_24h: `${BASE}/qpf/d24.gif`,
  day3_24h: `${BASE}/qpf/d34.gif`,
  day1_6h_1: `${BASE}/qpf/p06i.gif`,
  day1_6h_2: `${BASE}/qpf/p12i.gif`,
  day1_6h_3: `${BASE}/qpf/p18i.gif`,
  day1_6h_4: `${BASE}/qpf/p24i.gif`,
  day5_accum: `${BASE}/qpf/p120i.gif`,
  day7_accum: `${BASE}/qpf/p168i.gif`,
};

export const NATIONAL_FORECAST = {
  day1: `${BASE}/NationalForecastChart/staticimages/noaaforecast-day1.png`,
  day2: `${BASE}/NationalForecastChart/staticimages/noaaforecast-day2.png`,
  day3: `${BASE}/NationalForecastChart/staticimages/noaaforecast-day3.png`,
};

export const ERO = {
  day1: `${BASE}/qpf/ero/ero_d1.gif`,
  day2: `${BASE}/qpf/ero/ero_d2.gif`,
  day3: `${BASE}/qpf/ero/ero_d3.gif`,
};

export const WINTER_PRODUCTS = {
  wssi: `${BASE}/wwd/wssi/wssi_main_day1.png`,
  prob_snow_24: `${BASE}/wwd/pwpf_d12/images/gifd2/PWPF_SNW24_D2.gif`,
  prob_ice_24: `${BASE}/wwd/pwpf_d12/images/gifd2/PWPF_ICE24_D2.gif`,
};

export const DISCUSSIONS = {
  shortRange: 'pmdspd',
  extended: 'pmdepd',
  qpf: 'pmdqpf',
};

export async function fetchDiscussion(type = 'pmdspd') {
  const res = await fetch(`${BASE}/discussions/hpcdiscussions.php?disc=${type}`);
  if (!res.ok) throw new Error('WPC discussion fetch error');
  const html = await res.text();
  const match = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
  return match ? match[1].trim() : 'Discussion unavailable.';
}

export async function fetchMPDs() {
  try {
    const res = await fetch(`${BASE}/jwapps/data/mpd/mpd.json`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchFrontData() {
  try {
    const res = await fetch(`${BASE}/jwapps/data/mapdata/national_forecast_chart_mapdata.json`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
