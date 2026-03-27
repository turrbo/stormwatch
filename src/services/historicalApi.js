// Historical weather data - Open-Meteo Archive (back to 1940)
const ARCHIVE_BASE = 'https://archive-api.open-meteo.com/v1/archive';

export async function fetchHistoricalWeather(lat, lon, startDate, endDate) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    start_date: startDate,
    end_date: endDate,
    daily: [
      'temperature_2m_max', 'temperature_2m_min', 'temperature_2m_mean',
      'precipitation_sum', 'rain_sum', 'snowfall_sum',
      'wind_speed_10m_max', 'wind_gusts_10m_max',
    ].join(','),
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timezone: 'auto',
  });
  const res = await fetch(`${ARCHIVE_BASE}?${params}`);
  if (!res.ok) throw new Error(`Archive API error: ${res.status}`);
  return res.json();
}

export async function fetchThisDayInHistory(lat, lon) {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentYear = today.getFullYear();

  // Fetch last 10 years for this date
  const years = [];
  for (let y = currentYear - 10; y < currentYear; y++) {
    years.push(y);
  }

  const results = await Promise.allSettled(
    years.map(async (year) => {
      const date = `${year}-${month}-${day}`;
      const data = await fetchHistoricalWeather(lat, lon, date, date);
      return {
        year,
        tempMax: data.daily?.temperature_2m_max?.[0],
        tempMin: data.daily?.temperature_2m_min?.[0],
        tempMean: data.daily?.temperature_2m_mean?.[0],
        precip: data.daily?.precipitation_sum?.[0],
        snow: data.daily?.snowfall_sum?.[0],
        windMax: data.daily?.wind_speed_10m_max?.[0],
      };
    })
  );

  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}

// Fetch climate normals (30-year average approximation)
export async function fetchClimateNormals(lat, lon, month) {
  const startYear = 1991;
  const endYear = 2020;
  const startDate = `${startYear}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${endYear}-${String(month).padStart(2, '0')}-28`;

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    start_date: startDate,
    end_date: endDate,
    daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'].join(','),
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    timezone: 'auto',
  });

  const res = await fetch(`${ARCHIVE_BASE}?${params}`);
  if (!res.ok) return null;
  return res.json();
}
