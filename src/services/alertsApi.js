const NWS_BASE = 'https://api.weather.gov';

export async function fetchAlerts(lat, lon) {
  const point = `${Number(lat).toFixed(4)},${Number(lon).toFixed(4)}`;
  const res = await fetch(`${NWS_BASE}/alerts/active?point=${point}`, {
    headers: { 'User-Agent': 'CommandCenter Weather App' },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.features || []).map(f => ({
    id: f.id,
    event: f.properties.event,
    headline: f.properties.headline,
    description: f.properties.description,
    severity: f.properties.severity,
    urgency: f.properties.urgency,
    certainty: f.properties.certainty,
    onset: f.properties.onset,
    expires: f.properties.expires,
    senderName: f.properties.senderName,
    instruction: f.properties.instruction,
  }));
}

export function getAlertColor(severity) {
  switch (severity) {
    case 'Extreme': return { bg: 'rgba(220,38,38,0.2)', border: '#dc2626', text: '#fca5a5' };
    case 'Severe': return { bg: 'rgba(249,115,22,0.2)', border: '#f97316', text: '#fdba74' };
    case 'Moderate': return { bg: 'rgba(234,179,8,0.2)', border: '#eab308', text: '#fde047' };
    default: return { bg: 'rgba(59,130,246,0.2)', border: '#3b82f6', text: '#93c5fd' };
  }
}
