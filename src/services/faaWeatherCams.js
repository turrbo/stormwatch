// FAA Aviation Weather Cameras
// API: https://weathercams.faa.gov/api (CORS enabled: Access-Control-Allow-Origin: *)
// 922 sites, 3337 cameras across US (heavy in AK, CA, CO, MT, OR, HI, ME, NV)
// Images update every ~5 minutes
// CDN: https://images.wcams-static.faa.gov/webimages/{siteId}/{dayOfMonth}/{cameraId}-{unix_ms}.jpg

const API_BASE = 'https://weathercams.faa.gov/api';
const HEADERS = {
  Referer: 'https://weathercams.faa.gov/',
  Origin: 'https://weathercams.faa.gov',
  Accept: 'application/json',
};

// Fetch all US sites grouped by state
export async function fetchFaaSites() {
  const res = await fetch(`${API_BASE}/sites`, { headers: HEADERS });
  if (!res.ok) throw new Error(`FAA API ${res.status}`);
  const data = await res.json();

  const byState = {};
  for (const site of data.payload || []) {
    if (site.country !== 'US' || !site.siteActive) continue;
    const state = site.state;
    if (!state) continue;

    const activeCams = (site.cameras || []).filter(
      (c) => !c.cameraOutOfOrder && !c.cameraInMaintenance
    );
    if (activeCams.length === 0) continue;

    if (!byState[state]) byState[state] = [];
    byState[state].push({
      siteId: site.siteId,
      siteName: site.siteName,
      siteArea: site.siteArea || site.siteName,
      state,
      lat: site.latitude,
      lng: site.longitude,
      icao: site.icao || '',
      cameras: activeCams.map((c) => ({
        cameraId: c.cameraId,
        name: c.cameraName,
        direction: c.cameraDirection,
      })),
    });
  }

  return byState;
}

// Fetch latest image URL for a camera
export async function fetchCameraImage(cameraId) {
  const res = await fetch(`${API_BASE}/cameras/${cameraId}/images/last/1`, {
    headers: HEADERS,
  });
  if (!res.ok) return null;
  const data = await res.json();
  const img = data.payload?.[0];
  return img?.imageUri || null;
}

// Fetch latest images for multiple cameras (batched)
export async function fetchCameraImages(cameraIds) {
  const results = {};
  const promises = cameraIds.map(async (id) => {
    try {
      const url = await fetchCameraImage(id);
      results[id] = url;
    } catch {
      results[id] = null;
    }
  });
  await Promise.all(promises);
  return results;
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
