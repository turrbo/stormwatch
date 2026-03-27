// NOAA WPC - Surface analysis, QPF, ERO, winter weather products
const BASE = 'https://www.wpc.ncep.noaa.gov';

export const SURFACE_ANALYSIS = {
  current: `${BASE}/sfc/namussfcwbg.gif`,
  namussfc: (hh) => `${BASE}/sfc/namussfc${hh}wbg.gif`,
};

export const QPF_PRODUCTS = {
  day1_24h: `${BASE}/qpf/fill_94qwbg.gif`,
  day2_24h: `${BASE}/qpf/fill_98qwbg.gif`,
  day5_accum: `${BASE}/qpf/p120i.gif`,
  day7_accum: `${BASE}/qpf/p168i.gif`,
};

export const NATIONAL_FORECAST = {
  day1: `${BASE}/noaa/noaad1.gif`,
  day2: `${BASE}/noaa/noaad2.gif`,
  day3: `${BASE}/noaa/noaad3.gif`,
};

export const ERO = {
  day1: `${BASE}/qpf/94ewbg.gif`,
  day2: `${BASE}/qpf/98ewbg.gif`,
  day3: `${BASE}/qpf/99ewbg.gif`,
};

export const WINTER_PRODUCTS = {
  wssi_overall: `${BASE}/wwd/wssi/images/web_CONUS_WSSI_Maximum_Overall.png`,
  wssi_snow: `${BASE}/wwd/wssi/images/web_CONUS_WSSI_Maximum_Snow_Amount.png`,
  wssi_ice: `${BASE}/wwd/wssi/images/web_CONUS_WSSI_Maximum_Ice_Accumulation.png`,
  wssi_blowing: `${BASE}/wwd/wssi/images/web_CONUS_WSSI_Maximum_Blowing_Snow.png`,
};

export const DISCUSSIONS = {
  shortRange: 'pmdspd',
  extended: 'pmdepd',
  qpf: 'pmdqpf',
};

// Use NWS API (has CORS) instead of WPC direct (no CORS)
export async function fetchDiscussion(type = 'pmdspd') {
  // Map WPC disc types to NWS product search terms
  const typeMap = {
    pmdspd: 'PMD',  // Short Range Prognostic Discussion
    pmdepd: 'PMD',  // Extended Prognostic Discussion
    pmdqpf: 'PMD',  // QPF Discussion
  };
  const productType = typeMap[type] || 'PMD';

  try {
    const res = await fetch(`https://api.weather.gov/products/types/${productType}`);
    if (!res.ok) throw new Error('NWS API error');
    const data = await res.json();
    const products = data['@graph'] || [];

    // Find the matching discussion by product code
    const codeMap = { pmdspd: 'Short Range', pmdepd: 'Extended', pmdqpf: 'QPF' };
    const searchTerm = codeMap[type] || '';

    // Get the first product, or search for a matching one
    let target = products[0];
    if (searchTerm) {
      const match = products.find(p =>
        (p.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (match) target = match;
    }

    if (!target) return 'No discussion available.';

    // Fetch the actual product text
    const prodRes = await fetch(`https://api.weather.gov/products/${target.id}`);
    if (!prodRes.ok) throw new Error('Product fetch error');
    const prodData = await prodRes.json();
    return prodData.productText || 'Discussion text unavailable.';
  } catch {
    return 'Failed to load discussion. NWS API may be temporarily unavailable.';
  }
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
