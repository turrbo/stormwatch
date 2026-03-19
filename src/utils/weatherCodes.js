export const weatherCodes = {
  0: { label: 'Clear Sky', icon: 'Sun' },
  1: { label: 'Mainly Clear', icon: 'Sun' },
  2: { label: 'Partly Cloudy', icon: 'CloudSun' },
  3: { label: 'Overcast', icon: 'Cloud' },
  45: { label: 'Foggy', icon: 'CloudFog' },
  48: { label: 'Depositing Rime Fog', icon: 'CloudFog' },
  51: { label: 'Light Drizzle', icon: 'CloudDrizzle' },
  53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle' },
  55: { label: 'Dense Drizzle', icon: 'CloudDrizzle' },
  56: { label: 'Light Freezing Drizzle', icon: 'CloudSnow' },
  57: { label: 'Dense Freezing Drizzle', icon: 'CloudSnow' },
  61: { label: 'Slight Rain', icon: 'CloudRain' },
  63: { label: 'Moderate Rain', icon: 'CloudRain' },
  65: { label: 'Heavy Rain', icon: 'CloudRainWind' },
  66: { label: 'Light Freezing Rain', icon: 'CloudSnow' },
  67: { label: 'Heavy Freezing Rain', icon: 'CloudSnow' },
  71: { label: 'Slight Snowfall', icon: 'Snowflake' },
  73: { label: 'Moderate Snowfall', icon: 'Snowflake' },
  75: { label: 'Heavy Snowfall', icon: 'Snowflake' },
  77: { label: 'Snow Grains', icon: 'Snowflake' },
  80: { label: 'Slight Rain Showers', icon: 'CloudRain' },
  81: { label: 'Moderate Rain Showers', icon: 'CloudRainWind' },
  82: { label: 'Violent Rain Showers', icon: 'CloudRainWind' },
  85: { label: 'Slight Snow Showers', icon: 'Snowflake' },
  86: { label: 'Heavy Snow Showers', icon: 'Snowflake' },
  95: { label: 'Thunderstorm', icon: 'CloudLightning' },
  96: { label: 'Thunderstorm w/ Slight Hail', icon: 'CloudLightning' },
  99: { label: 'Thunderstorm w/ Heavy Hail', icon: 'CloudLightning' },
};

export function getWeatherInfo(code) {
  return weatherCodes[code] || { label: 'Unknown', icon: 'Cloud' };
}

export function getTempClass(tempF) {
  if (tempF >= 95) return 'temp-hot';
  if (tempF >= 75) return 'temp-warm';
  if (tempF >= 55) return 'temp-mild';
  if (tempF >= 35) return 'temp-cool';
  return 'temp-cold';
}
