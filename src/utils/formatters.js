import { format, isToday, isTomorrow, parseISO } from 'date-fns';

export function formatTemp(temp) {
  return `${Math.round(temp)}°`;
}

export function formatTempF(temp) {
  return `${Math.round(temp)}°F`;
}

export function formatHour(isoString) {
  const date = parseISO(isoString);
  if (isToday(date)) {
    const hour = date.getHours();
    if (hour === new Date().getHours()) return 'Now';
  }
  return format(date, 'ha').toLowerCase();
}

export function formatDayName(isoString) {
  const date = parseISO(isoString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEE');
}

export function formatFullDate(isoString) {
  return format(parseISO(isoString), 'MMM d');
}

export function formatTime(isoString) {
  return format(parseISO(isoString), 'h:mm a');
}

export function formatWindDirection(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
}

export function getAQILevel(aqi) {
  if (aqi <= 50) return { label: 'Good', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' };
  if (aqi <= 100) return { label: 'Moderate', color: '#eab308', bg: 'rgba(234,179,8,0.15)' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: '#f97316', bg: 'rgba(249,115,22,0.15)' };
  if (aqi <= 200) return { label: 'Unhealthy', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' };
  return { label: 'Hazardous', color: '#991b1b', bg: 'rgba(153,27,27,0.15)' };
}

export function getUVLevel(uv) {
  if (uv <= 2) return { label: 'Low', color: '#22c55e' };
  if (uv <= 5) return { label: 'Moderate', color: '#eab308' };
  if (uv <= 7) return { label: 'High', color: '#f97316' };
  if (uv <= 10) return { label: 'Very High', color: '#ef4444' };
  return { label: 'Extreme', color: '#a855f7' };
}
