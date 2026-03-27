// FAA Aviation Weather Cameras - Pre-fetched site data
// Image CDN: https://cleardays.wcams-static.faa.gov/{cameraId}-clearday.jpg (no auth)
// Live view: https://weathercams.faa.gov/camera/{cameraId}
// 922 sites total, ~94 selected across 33 US states (up to 4 per state)
// Note: FAA API requires Referer header matching their domain, so browser
// fetch is blocked. Using static data + public CDN images instead.

const CLEAR_CDN = 'https://cleardays.wcams-static.faa.gov';

// Build image URL for a camera (clear-day reference, always available)
export function faaImageUrl(cameraId) {
  return `${CLEAR_CDN}/${cameraId}-clearday.jpg`;
}

// Link to FAA live camera view
export function faaLiveUrl(cameraId) {
  return `https://weathercams.faa.gov/camera/${cameraId}`;
}

// US state names for display
export const STATE_NAMES = {
  AK: 'Alaska', AL: 'Alabama', AR: 'Arkansas', AZ: 'Arizona',
  CA: 'California', CO: 'Colorado', FL: 'Florida', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', KS: 'Kansas', KY: 'Kentucky',
  MA: 'Massachusetts', ME: 'Maine', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MT: 'Montana', NC: 'North Carolina', ND: 'North Dakota',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NV: 'Nevada',
  NY: 'New York', OR: 'Oregon', SD: 'South Dakota', TX: 'Texas',
  UT: 'Utah', VT: 'Vermont', WA: 'Washington', WI: 'Wisconsin',
  WY: 'Wyoming',
};

// Pre-fetched FAA camera sites (up to 4 per state, 33 states)
export const FAA_SITES = [
  // Alaska
  { siteId: 142, name: 'Old Harbor', area: 'Old Harbor', state: 'AK', lat: 57.1999, lng: -153.3068, camId: 10415 },
  { siteId: 261, name: 'Tanana', area: 'Tanana', state: 'AK', lat: 65.1732, lng: -152.1096, camId: 10925, icao: 'PATA' },
  { siteId: 81, name: 'Puntilla Lake', area: 'Rainy Pass', state: 'AK', lat: 62.0979, lng: -152.7339, camId: 10200, icao: 'PAPT' },
  { siteId: 233, name: 'Port Lions', area: 'Port Lions', state: 'AK', lat: 57.8839, lng: -152.8514, camId: 10789 },
  // Alabama
  { siteId: 694, name: 'Intermodal', area: 'Huntsville Intl Airport', state: 'AL', lat: 34.6202, lng: -86.7557, camId: 12444 },
  { siteId: 875, name: 'Dauphin Island', area: 'Dauphin Island', state: 'AL', lat: 30.2584, lng: -88.107, camId: 13207, icao: '4R9' },
  { siteId: 857, name: 'Jasper', area: 'Walker County', state: 'AL', lat: 33.8637, lng: -87.2642, camId: 13134, icao: 'JFX' },
  // Arkansas
  { siteId: 1023, name: 'Jonesboro', area: 'Jonesboro', state: 'AR', lat: 35.8338, lng: -90.6519, camId: 13799, icao: 'KJBR' },
  // Arizona
  { siteId: 927, name: 'Sky Dome NAU', area: 'Flagstaff', state: 'AZ', lat: 35.1805, lng: -111.6528, camId: 13400 },
  // California
  { siteId: 916, name: 'Orcutt', area: 'Orcutt', state: 'CA', lat: 34.8654, lng: -120.5053, camId: 13359 },
  { siteId: 704, name: 'Templeton', area: 'Templeton', state: 'CA', lat: 35.5669, lng: -120.8193, camId: 12603 },
  { siteId: 714, name: 'Ballard Ridge', area: 'Ballard Ridge', state: 'CA', lat: 41.363, lng: -120.839, camId: 12591 },
  { siteId: 828, name: 'Dyer Mtn', area: 'Dyer Mtn', state: 'CA', lat: 40.239, lng: -121.0327, camId: 13030 },
  // Colorado
  { siteId: 575, name: 'Grand Junction Regional', area: 'Grand Junction', state: 'CO', lat: 39.1181, lng: -108.5181, camId: 12100, icao: 'KGJT' },
  { siteId: 97, name: 'Wolf Creek Pass', area: 'Wolf Creek Pass', state: 'CO', lat: 37.4929, lng: -106.801, camId: 11940, icao: 'KCPW' },
  { siteId: 579, name: 'Cortez Municipal', area: 'Cortez', state: 'CO', lat: 37.3047, lng: -108.6308, camId: 12115, icao: 'KCEZ' },
  { siteId: 539, name: 'Durango / La Plata', area: 'Durango', state: 'CO', lat: 37.1561, lng: -107.7524, camId: 11959, icao: 'KDRO' },
  // Florida
  { siteId: 934, name: 'Lakeland Linder', area: 'Lakeland', state: 'FL', lat: 27.9866, lng: -82.0193, camId: 13428 },
  { siteId: 1011, name: 'Salty Approach', area: 'North Captiva Island', state: 'FL', lat: 26.6035, lng: -82.2204, camId: 13751, icao: 'FL90' },
  { siteId: 988, name: 'Destin', area: 'Destin ATCT', state: 'FL', lat: 30.3986, lng: -86.468, camId: 13661 },
  { siteId: 990, name: 'Crestview', area: 'Crestview', state: 'FL', lat: 30.776, lng: -86.5252, camId: 13669, icao: 'KCEW' },
  // Hawaii
  { siteId: 690, name: 'Hana', area: 'Hana', state: 'HI', lat: 20.7946, lng: -156.0159, camId: 12421, icao: 'PHHN' },
  { siteId: 567, name: 'Upolu', area: 'Upolu', state: 'HI', lat: 20.257, lng: -155.8471, camId: 12067, icao: 'PHUP' },
  { siteId: 560, name: 'Waimea', area: 'Waimea', state: 'HI', lat: 19.9331, lng: -155.645, camId: 12041, icao: 'MUE' },
  { siteId: 1038, name: 'Bradshaw', area: 'Bradshaw', state: 'HI', lat: 19.7523, lng: -155.5246, camId: 13858 },
  // Idaho
  { siteId: 781, name: 'Mt Harrison', area: 'Mt Harrison', state: 'ID', lat: 42.3262, lng: -113.6557, camId: 12864 },
  { siteId: 736, name: 'Black Mtn Boundary', area: 'Black Mtn', state: 'ID', lat: 48.6105, lng: -116.2567, camId: 12614 },
  { siteId: 971, name: 'Johnson Creek', area: 'Johnson Creek', state: 'ID', lat: 44.9115, lng: -115.4851, camId: 13599 },
  { siteId: 926, name: 'Notch Butte', area: 'Notch Butte', state: 'ID', lat: 42.8847, lng: -114.4185, camId: 13398 },
  // Illinois
  { siteId: 942, name: 'Lake in the Hills', area: 'Lake in the Hills', state: 'IL', lat: 42.2058, lng: -88.3169, camId: 13467 },
  { siteId: 943, name: 'Illinois Valley Regional', area: 'Illinois Valley', state: 'IL', lat: 41.353, lng: -89.1496, camId: 13471, icao: 'KVYS' },
  // Kansas
  { siteId: 1049, name: 'Augusta', area: 'Augusta', state: 'KS', lat: 37.6937, lng: -97.0966, camId: 13895 },
  // Kentucky
  { siteId: 954, name: 'Highlands', area: 'Highlands', state: 'KY', lat: 37.1645, lng: -82.6236, camId: 13517 },
  // Massachusetts
  { siteId: 733, name: 'Lawrence Muni', area: 'Lawrence', state: 'MA', lat: 42.7176, lng: -71.1221, camId: 12612, icao: 'KLWM' },
  { siteId: 1045, name: 'Nantucket Airport', area: 'Nantucket', state: 'MA', lat: 41.2571, lng: -70.0633, camId: 13884, icao: 'KACK' },
  { siteId: 1048, name: 'Chatham Municipal', area: 'Chatham', state: 'MA', lat: 41.6885, lng: -69.9915, camId: 13888, icao: 'KCQX' },
  // Maine
  { siteId: 737, name: 'Deblois Flight Strip', area: 'Deblois', state: 'ME', lat: 44.7244, lng: -67.9788, camId: 12622, icao: '43B' },
  { siteId: 595, name: 'Houlton Intl Airport', area: 'Houlton', state: 'ME', lat: 46.1262, lng: -67.7852, camId: 12180, icao: 'HUL' },
  { siteId: 621, name: 'Eastport Municipal', area: 'Eastport', state: 'ME', lat: 44.9125, lng: -67.012, camId: 12277, icao: 'EPM' },
  { siteId: 689, name: 'Lincoln Regional', area: 'Lincoln', state: 'ME', lat: 45.3584, lng: -68.5333, camId: 12424 },
  // Michigan
  { siteId: 552, name: 'U of M Ann Arbor', area: 'Ann Arbor', state: 'MI', lat: 42.2818, lng: -83.7272, camId: 12010 },
  // Minnesota
  { siteId: 718, name: 'Caledonia', area: 'Houston County', state: 'MN', lat: 43.5984, lng: -91.5083, camId: 12482, icao: 'KCHU' },
  { siteId: 721, name: 'Eveleth', area: 'Virginia Muni', state: 'MN', lat: 47.427, lng: -92.5042, camId: 12492, icao: 'KEVM' },
  { siteId: 892, name: 'Faribault', area: 'Faribault', state: 'MN', lat: 44.3279, lng: -93.3062, camId: 13265 },
  { siteId: 720, name: 'Henning Municipal', area: 'Henning', state: 'MN', lat: 46.305, lng: -95.4406, camId: 12490, icao: '05Y' },
  // Mississippi
  { siteId: 1022, name: 'Corinth', area: 'Corinth', state: 'MS', lat: 34.9102, lng: -88.5513, camId: 13794, icao: 'KCRX' },
  { siteId: 554, name: 'UMMC Lexington', area: 'Lexington', state: 'MS', lat: 33.1116, lng: -90.0306, camId: 12020 },
  { siteId: 553, name: 'UMMC Jackson', area: 'Jackson', state: 'MS', lat: 32.3291, lng: -90.1738, camId: 12015 },
  // Montana
  { siteId: 820, name: 'Jordan Airport', area: 'Jordan', state: 'MT', lat: 47.3262, lng: -106.9482, camId: 12997, icao: 'JDN' },
  { siteId: 683, name: 'Malta Airport', area: 'Malta', state: 'MT', lat: 48.3685, lng: -107.9126, camId: 12396, icao: 'M75' },
  { siteId: 648, name: 'Billings Airport', area: 'Billings', state: 'MT', lat: 45.8034, lng: -108.5446, camId: 12345 },
  { siteId: 983, name: 'Forsyth Airport', area: 'Forsyth', state: 'MT', lat: 46.2722, lng: -106.62, camId: 13645 },
  // North Carolina
  { siteId: 1009, name: 'Smith Reynolds', area: 'Winston-Salem', state: 'NC', lat: 36.1292, lng: -80.2206, camId: 13745, icao: 'KINT' },
  // North Dakota
  { siteId: 972, name: 'Cavalier Municipal', area: 'Cavalier', state: 'ND', lat: 48.7864, lng: -97.6303, camId: 13604 },
  { siteId: 974, name: 'Kindred Regional', area: 'Kindred', state: 'ND', lat: 46.6497, lng: -97.0058, camId: 13612 },
  { siteId: 842, name: 'Barnes County Muni', area: 'Barnes County', state: 'ND', lat: 46.9364, lng: -98.0122, camId: 13078 },
  { siteId: 989, name: 'Mayville Municipal', area: 'Mayville', state: 'ND', lat: 47.4768, lng: -97.3269, camId: 13665 },
  // New Hampshire
  { siteId: 734, name: 'Berlin Regional', area: 'Berlin', state: 'NH', lat: 44.5758, lng: -71.1782, camId: 12594, icao: 'BML' },
  // New Jersey
  { siteId: 976, name: 'Teterboro Airport', area: 'Teterboro', state: 'NJ', lat: 40.8502, lng: -74.0549, camId: 13620, icao: 'KTEB' },
  { siteId: 619, name: 'Sky Manor Airport', area: 'Sky Manor', state: 'NJ', lat: 40.569, lng: -74.9753, camId: 12271, icao: 'N40' },
  // New Mexico
  { siteId: 896, name: 'Double Eagle II', area: 'Albuquerque', state: 'NM', lat: 35.1346, lng: -106.7939, camId: 13280, icao: 'KAEG' },
  { siteId: 897, name: 'Santa Fe', area: 'Santa Fe', state: 'NM', lat: 35.6176, lng: -106.0848, camId: 13284, icao: 'SAF' },
  { siteId: 1025, name: 'Tesuque Peak', area: 'Tesuque Peak', state: 'NM', lat: 35.7852, lng: -105.7821, camId: 13807 },
  // Nevada
  { siteId: 774, name: 'Yellow Peak', area: 'Yellow Peak', state: 'NV', lat: 41.836, lng: -119.6244, camId: 12841 },
  { siteId: 776, name: 'Fox Mtn', area: 'Fox Mtn', state: 'NV', lat: 41.0255, lng: -119.5582, camId: 12847 },
  { siteId: 829, name: 'Reno-Stead', area: 'Reno', state: 'NV', lat: 39.6596, lng: -119.8736, camId: 13033, icao: 'KRTS' },
  { siteId: 789, name: 'Bald Mtn', area: 'Bald Mtn', state: 'NV', lat: 38.808, lng: -119.523, camId: 12889 },
  // New York
  { siteId: 975, name: 'Westchester County', area: 'White Plains', state: 'NY', lat: 41.063, lng: -73.7109, camId: 13615 },
  // Oregon
  { siteId: 886, name: 'Green Mtn', area: 'Green Mtn', state: 'OR', lat: 43.3871, lng: -120.7252, camId: 13248 },
  { siteId: 756, name: 'Beaty Butte', area: 'Beaty Butte', state: 'OR', lat: 42.3859, lng: -119.3321, camId: 12768 },
  { siteId: 764, name: 'Bryant Mtn', area: 'Bryant Mtn', state: 'OR', lat: 42.0339, lng: -121.2759, camId: 12799 },
  { siteId: 766, name: 'Fish Creek Rim', area: 'Fish Creek Rim', state: 'OR', lat: 42.1868, lng: -119.9251, camId: 12809 },
  // South Dakota
  { siteId: 1013, name: 'Black Hills Airport', area: 'Spearfish', state: 'SD', lat: 44.4833, lng: -103.7836, camId: 13759, icao: 'KSPF' },
  { siteId: 786, name: 'Sturgis', area: 'Sturgis', state: 'SD', lat: 44.4222, lng: -103.3794, camId: 12902 },
  // Texas
  { siteId: 997, name: 'Sugar Land', area: 'Sugar Land', state: 'TX', lat: 29.625, lng: -95.659, camId: 13698, icao: 'KSGR' },
  { siteId: 960, name: 'Beach City', area: 'Beach City', state: 'TX', lat: 29.7601, lng: -94.8492, camId: 13557 },
  { siteId: 999, name: 'Post Oak Heliport', area: 'Houston', state: 'TX', lat: 29.7525, lng: -95.4573, camId: 13705, icao: '7XA7' },
  { siteId: 1058, name: 'Gainesville Muni', area: 'Gainesville', state: 'TX', lat: 33.651, lng: -97.2026, camId: 13924, icao: 'KGLE' },
  // Utah
  { siteId: 845, name: 'Dutch John', area: 'Dutch John', state: 'UT', lat: 40.9594, lng: -109.4169, camId: 13089 },
  { siteId: 556, name: 'Heber Valley', area: 'Heber Valley', state: 'UT', lat: 40.4835, lng: -111.4235, camId: 12027, icao: 'KHCR' },
  { siteId: 969, name: 'Ogden', area: 'Ogden', state: 'UT', lat: 41.1936, lng: -112.0083, camId: 13590 },
  { siteId: 993, name: 'Tooele Valley', area: 'Tooele', state: 'UT', lat: 40.6088, lng: -112.3477, camId: 13681, icao: 'KTVY' },
  // Vermont
  { siteId: 1004, name: 'Rutland', area: 'Rutland', state: 'VT', lat: 43.5285, lng: -72.9461, camId: 13722, icao: 'KRUT' },
  { siteId: 1006, name: 'Middlebury', area: 'Middlebury', state: 'VT', lat: 43.9856, lng: -73.0965, camId: 13733 },
  { siteId: 1005, name: 'Bennington', area: 'Bennington', state: 'VT', lat: 42.8898, lng: -73.2468, camId: 13729, icao: 'KDDH' },
  // Washington
  { siteId: 1015, name: 'Anderson', area: 'Anderson', state: 'WA', lat: 46.4592, lng: -119.8989, camId: 13767 },
  { siteId: 787, name: 'Natapoc Ridge', area: 'Natapoc Ridge', state: 'WA', lat: 47.7747, lng: -120.6977, camId: 12882 },
  { siteId: 948, name: 'Satus Peak', area: 'Satus Peak', state: 'WA', lat: 46.2575, lng: -120.7535, camId: 13492 },
  { siteId: 946, name: 'Auburn', area: 'Auburn', state: 'WA', lat: 47.3276, lng: -122.2254, camId: 13482 },
  // Wisconsin
  { siteId: 1040, name: 'Shell Lake Muni', area: 'Shell Lake', state: 'WI', lat: 45.7299, lng: -91.9172, camId: 13864, icao: 'KSSQ' },
  // Wyoming
  { siteId: 844, name: 'Jackson Hole', area: 'Jackson Hole', state: 'WY', lat: 43.6079, lng: -110.7424, camId: 13086, icao: 'KJAC' },
  { siteId: 901, name: 'White Pine', area: 'White Pine', state: 'WY', lat: 42.9675, lng: -109.7478, camId: 13300 },
  { siteId: 1014, name: 'South Rim', area: 'South Rim', state: 'WY', lat: 43.1061, lng: -110.2311, camId: 13761 },
  { siteId: 873, name: 'Hogsback', area: 'Hogsback', state: 'WY', lat: 42.3292, lng: -110.3203, camId: 13197 },
];

// Group sites by state for filtering
export const FAA_BY_STATE = {};
for (const site of FAA_SITES) {
  if (!FAA_BY_STATE[site.state]) FAA_BY_STATE[site.state] = [];
  FAA_BY_STATE[site.state].push(site);
}
export const FAA_STATE_KEYS = Object.keys(FAA_BY_STATE).sort();
