// NOAA NDBC BuoyCAM data
// Source: https://www.ndbc.noaa.gov/buoycams.php (pre-fetched station list)
// Image endpoint: https://www.ndbc.noaa.gov/buoycam.php?station={ID}
//   - Serves latest JPEG directly (200, content-type: image/jpeg)
//   - No auth, no CORS issues for <img> tags
// Panoramic images (2880x300), update ~hourly during daylight
// 57 buoys with cameras across Atlantic, Gulf, Pacific, Alaska, Hawaii

// Get latest buoy camera image URL (serves JPEG directly, always current)
export function buoyImageUrl(stationId) {
  return `https://www.ndbc.noaa.gov/buoycam.php?station=${stationId}`;
}

// Regions for filtering
export const BUOY_REGIONS = {
  'Atlantic': ['41002', '41004', '41009', '41013', '41025', '41043', '41044', '41046', '41049',
    '44007', '44008', '44009', '44011', '44013', '44014', '44020', '44027', '44065'],
  'Gulf of Mexico': ['42001', '42002', '42012', '42035', '42036', '42039', '42040', '42055', '42056', '42057', '42060'],
  'Pacific': ['46002', '46006', '46011', '46013', '46014', '46015', '46022', '46025', '46026',
    '46027', '46028', '46029', '46041', '46047', '46050', '46059', '46069', '46087', '46088', '46089'],
  'Alaska': ['46001', '46035', '46060', '46061', '46066', '46070', '46071', '46072', '46077',
    '46080', '46081', '46082', '46083', '46084', '46085'],
  'Hawaii': ['51000', '51001', '51002', '51004', '51101'],
};

// Pre-fetched buoy data with image codes
export const BUOY_STATIONS = [
  // Atlantic
  { id: '41002', name: 'South Hatteras', location: '225 NM South of Cape Hatteras', lat: 31.743, lng: -74.955, imgCode: 'Z24A', region: 'Atlantic' },
  { id: '41004', name: 'Edisto', location: '41 NM SE of Charleston, SC', lat: 32.502, lng: -79.099, imgCode: 'Z20A', region: 'Atlantic' },
  { id: '41009', name: 'Canaveral', location: '20 NM East of Cape Canaveral, FL', lat: 28.508, lng: -80.185, imgCode: 'X02A', region: 'Atlantic' },
  { id: '41013', name: 'Frying Pan Shoals', location: 'Frying Pan Shoals, NC', lat: 33.441, lng: -77.764, imgCode: 'W22A', region: 'Atlantic' },
  { id: '41025', name: 'Diamond Shoals', location: 'Diamond Shoals, NC', lat: 35.026, lng: -75.38, imgCode: 'Z81A', region: 'Atlantic' },
  { id: '41049', name: 'South Bermuda', location: '300 NM SSE of Bermuda', lat: 27.505, lng: -62.271, imgCode: 'Z21A', region: 'Atlantic' },
  { id: '44007', name: 'Portland', location: '12 NM SE of Portland, ME', lat: 43.525, lng: -70.14, imgCode: 'W30A', region: 'Atlantic' },
  { id: '44008', name: 'Nantucket', location: '54 NM SE of Nantucket', lat: 40.5, lng: -69.254, imgCode: 'W19A', region: 'Atlantic' },
  { id: '44009', name: 'Delaware Bay', location: '26 NM SE of Cape May, NJ', lat: 38.46, lng: -74.692, imgCode: 'W77A', region: 'Atlantic' },
  { id: '44011', name: 'Georges Bank', location: '170 NM East of Hyannis, MA', lat: 41.088, lng: -66.546, imgCode: 'Z97A', region: 'Atlantic' },
  { id: '44013', name: 'Boston', location: '16 NM East of Boston, MA', lat: 42.346, lng: -70.651, imgCode: 'Z03A', region: 'Atlantic' },
  { id: '44014', name: 'Virginia Beach', location: '64 NM East of Virginia Beach, VA', lat: 36.603, lng: -74.837, imgCode: 'Z78A', region: 'Atlantic' },
  { id: '44020', name: 'Nantucket Sound', location: 'Nantucket Sound', lat: 41.497, lng: -70.283, imgCode: 'W61A', region: 'Atlantic' },
  { id: '44027', name: 'Jonesport', location: '20 NM SE of Jonesport, ME', lat: 44.284, lng: -67.301, imgCode: 'Z70A', region: 'Atlantic' },
  { id: '44065', name: 'NY Harbor Entrance', location: '15 NM SE of Breezy Point, NY', lat: 40.368, lng: -73.701, imgCode: 'W95A', region: 'Atlantic' },
  // Gulf of Mexico
  { id: '42001', name: 'Mid Gulf', location: '180 NM South of SW Pass, LA', lat: 25.925, lng: -89.628, imgCode: 'Z15A', region: 'Gulf of Mexico' },
  { id: '42002', name: 'West Gulf', location: '207 NM East of Brownsville, TX', lat: 25.95, lng: -93.78, imgCode: 'Z49A', region: 'Gulf of Mexico' },
  { id: '42012', name: 'Orange Beach', location: '44 NM SE of Mobile, AL', lat: 30.06, lng: -87.548, imgCode: 'W93A', region: 'Gulf of Mexico' },
  { id: '42035', name: 'Galveston', location: '22 NM East of Galveston, TX', lat: 29.235, lng: -94.41, imgCode: 'Z29A', region: 'Gulf of Mexico' },
  { id: '42036', name: 'West Tampa', location: '112 NM WNW of Tampa, FL', lat: 28.5, lng: -84.505, imgCode: 'Z88A', region: 'Gulf of Mexico' },
  { id: '42039', name: 'Pensacola', location: '115 NM SSE of Pensacola, FL', lat: 28.768, lng: -86.024, imgCode: 'Z80A', region: 'Gulf of Mexico' },
  { id: '42040', name: 'Luke Offshore', location: '63 NM South of Dauphin Island, AL', lat: 29.207, lng: -88.237, imgCode: 'W48A', region: 'Gulf of Mexico' },
  // Pacific
  { id: '46002', name: 'West Oregon', location: '275 NM West of Coos Bay, OR', lat: 42.56, lng: -130.523, imgCode: 'W86A', region: 'Pacific' },
  { id: '46011', name: 'Santa Maria', location: '21 NM NW of Point Arguello, CA', lat: 34.937, lng: -120.999, imgCode: 'W74A', region: 'Pacific' },
  { id: '46013', name: 'Bodega Bay', location: '48 NM NW of San Francisco, CA', lat: 38.235, lng: -123.317, imgCode: 'W10A', region: 'Pacific' },
  { id: '46014', name: 'Point Arena', location: '19 NM North of Point Arena, CA', lat: 39.225, lng: -123.98, imgCode: 'W01A', region: 'Pacific' },
  { id: '46015', name: 'Port Orford', location: '15 NM West of Port Orford, OR', lat: 42.754, lng: -124.839, imgCode: 'W66A', region: 'Pacific' },
  { id: '46022', name: 'Eel River', location: '17 NM WSW of Eureka, CA', lat: 40.716, lng: -124.54, imgCode: 'W12A', region: 'Pacific' },
  { id: '46025', name: 'Santa Monica Basin', location: '33 NM WSW of Santa Monica, CA', lat: 33.755, lng: -119.045, imgCode: 'W24A', region: 'Pacific' },
  { id: '46026', name: 'San Francisco', location: '18 NM West of San Francisco, CA', lat: 37.75, lng: -122.838, imgCode: 'W49A', region: 'Pacific' },
  { id: '46027', name: 'St Georges', location: '8 NM NW of Crescent City, CA', lat: 41.84, lng: -124.382, imgCode: 'Z59A', region: 'Pacific' },
  { id: '46028', name: 'Cape San Martin', location: '55 NM WNW of Morro Bay, CA', lat: 35.77, lng: -121.903, imgCode: 'W52A', region: 'Pacific' },
  { id: '46029', name: 'Columbia River Bar', location: '20 NM West of Columbia River', lat: 46.148, lng: -124.508, imgCode: 'W62A', region: 'Pacific' },
  { id: '46041', name: 'Cape Elizabeth', location: '45 NM NW of Aberdeen, WA', lat: 47.352, lng: -124.739, imgCode: 'Z66A', region: 'Pacific' },
  { id: '46050', name: 'Stonewall Bank', location: '20 NM West of Newport, OR', lat: 44.679, lng: -124.535, imgCode: 'Z69A', region: 'Pacific' },
  { id: '46059', name: 'West California', location: '357 NM West of San Francisco, CA', lat: 38.067, lng: -129.895, imgCode: 'Z68A', region: 'Pacific' },
  { id: '46069', name: 'South Santa Rosa', location: '14 NM SW of Santa Rosa Is, CA', lat: 33.677, lng: -120.213, imgCode: 'W51A', region: 'Pacific' },
  { id: '46087', name: 'Neah Bay', location: '6 NM North of Cape Flattery, WA', lat: 48.493, lng: -124.727, imgCode: 'Z02A', region: 'Pacific' },
  { id: '46088', name: 'New Dungeness', location: '17 NM NE of Port Angeles, WA', lat: 48.332, lng: -123.179, imgCode: 'W33A', region: 'Pacific' },
  { id: '46089', name: 'Tillamook', location: '85 NM WNW of Tillamook, OR', lat: 45.928, lng: -125.815, imgCode: 'Z96A', region: 'Pacific' },
  // Alaska
  { id: '46001', name: 'Western Gulf of AK', location: '175 NM SE of Kodiak, AK', lat: 56.296, lng: -148.027, imgCode: 'W35A', region: 'Alaska' },
  { id: '46035', name: 'Central Bering Sea', location: '310 NM North of Adak, AK', lat: 57.034, lng: -177.468, imgCode: 'X06A', region: 'Alaska' },
  { id: '46060', name: 'West Orca Bay', location: '8 NM NW of Hinchinbrook Is, AK', lat: 60.571, lng: -146.795, imgCode: 'W85A', region: 'Alaska' },
  { id: '46061', name: 'Seal Rocks', location: 'Montague/Hinchinbrook Is, AK', lat: 60.23, lng: -146.837, imgCode: 'Z40A', region: 'Alaska' },
  { id: '46066', name: 'South Kodiak', location: '310 NM SSW of Kodiak, AK', lat: 52.776, lng: -154.992, imgCode: 'W58A', region: 'Alaska' },
  { id: '46077', name: 'Shelikof Strait', location: 'Shelikof Strait, AK', lat: 57.869, lng: -154.211, imgCode: 'W69A', region: 'Alaska' },
  { id: '46080', name: 'Portlock Bank', location: '76 NM ENE of Kodiak, AK', lat: 57.91, lng: -150.129, imgCode: 'Z26A', region: 'Alaska' },
  { id: '46081', name: 'W Prince William Sound', location: 'Western Prince William Sound', lat: 60.802, lng: -148.283, imgCode: 'Z91A', region: 'Alaska' },
  { id: '46082', name: 'Cape Suckling', location: '35 NM SE of Kayak Is, AK', lat: 59.67, lng: -143.353, imgCode: 'Z46A', region: 'Alaska' },
  { id: '46083', name: 'Fairweather Ground', location: '105 NM West of Juneau, AK', lat: 58.276, lng: -138.024, imgCode: 'Z14A', region: 'Alaska' },
  { id: '46084', name: 'Cape Edgecumbe', location: '25 NM SSW of Cape Edgecumbe, AK', lat: 56.614, lng: -136.04, imgCode: 'Z98A', region: 'Alaska' },
  { id: '46085', name: 'Central Gulf of AK', location: '265 NM W of Cape Ommaney, AK', lat: 55.84, lng: -142.895, imgCode: 'X07A', region: 'Alaska' },
  // Hawaii
  { id: '51000', name: 'Northern Hawaii', location: '245 NM NE of Honolulu, HI', lat: 23.534, lng: -153.752, imgCode: 'W26A', region: 'Hawaii' },
  { id: '51001', name: 'NW Hawaii', location: '188 NM NW of Kauai, HI', lat: 24.475, lng: -162.03, imgCode: 'W71A', region: 'Hawaii' },
  { id: '51002', name: 'SW Hawaii', location: '215 NM SSW of Hilo, HI', lat: 17.07, lng: -157.755, imgCode: 'Z38A', region: 'Hawaii' },
  { id: '51004', name: 'SE Hawaii', location: '205 NM SE of Hilo, HI', lat: 17.504, lng: -152.197, imgCode: 'Z32A', region: 'Hawaii' },
  { id: '51101', name: 'NW Hawaii Two', location: '186 NM NW of Kauai, HI', lat: 24.359, lng: -162.081, imgCode: 'W99A', region: 'Hawaii' },
];
