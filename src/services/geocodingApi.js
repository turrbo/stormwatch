const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_BASE = 'https://nominatim.openstreetmap.org/reverse';

export async function searchLocations(query) {
  if (!query || query.length < 2) return [];
  const params = new URLSearchParams({
    name: query,
    count: '8',
    language: 'en',
    format: 'json',
  });
  const res = await fetch(`${GEO_BASE}?${params}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []).map(r => ({
    id: r.id,
    name: r.name,
    admin1: r.admin1 || '',
    country: r.country || '',
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
    label: [r.name, r.admin1, r.country_code].filter(Boolean).join(', '),
  }));
}

export async function reverseGeocode(lat, lon) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    format: 'json',
    zoom: '10',
  });
  const res = await fetch(`${REVERSE_BASE}?${params}`, {
    headers: { 'Accept-Language': 'en' },
  });
  if (!res.ok) return { name: 'Current Location', admin1: '', country: '' };
  const data = await res.json();
  const addr = data.address || {};
  return {
    name: addr.city || addr.town || addr.village || addr.county || 'Current Location',
    admin1: addr.state || '',
    country: addr.country || '',
    label: [addr.city || addr.town || addr.village, addr.state].filter(Boolean).join(', '),
  };
}
