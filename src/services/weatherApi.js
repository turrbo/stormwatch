const BASE = 'https://api.open-meteo.com/v1/forecast';
const AQ_BASE = 'https://air-quality-api.open-meteo.com/v1/air-quality';

export async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
      'precipitation', 'rain', 'snowfall', 'weather_code', 'cloud_cover',
      'pressure_msl', 'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m',
      'is_day'
    ].join(','),
    hourly: [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
      'precipitation_probability', 'precipitation', 'weather_code',
      'cloud_cover', 'visibility', 'wind_speed_10m', 'wind_direction_10m',
      'wind_gusts_10m', 'uv_index', 'is_day'
    ].join(','),
    daily: [
      'weather_code', 'temperature_2m_max', 'temperature_2m_min',
      'apparent_temperature_max', 'apparent_temperature_min',
      'sunrise', 'sunset', 'uv_index_max', 'precipitation_sum',
      'precipitation_probability_max', 'wind_speed_10m_max',
      'wind_gusts_10m_max', 'wind_direction_10m_dominant'
    ].join(','),
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timezone: 'auto',
    forecast_days: '10',
    forecast_hours: '48',
  });

  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}

export async function fetchAirQuality(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: ['us_aqi', 'pm10', 'pm2_5', 'carbon_monoxide', 'nitrogen_dioxide', 'sulphur_dioxide', 'ozone'].join(','),
    hourly: ['us_aqi', 'pm2_5', 'pm10', 'ozone', 'uv_index'].join(','),
    timezone: 'auto',
    forecast_hours: '24',
  });

  const res = await fetch(`${AQ_BASE}?${params}`);
  if (!res.ok) throw new Error(`Air Quality API error: ${res.status}`);
  return res.json();
}
