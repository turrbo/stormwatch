import {
  Sun, Cloud, CloudSun, CloudRain, CloudRainWind, CloudDrizzle,
  CloudSnow, CloudLightning, CloudFog, Snowflake, Moon, CloudMoon,
} from 'lucide-react';

const iconMap = {
  Sun, Cloud, CloudSun, CloudRain, CloudRainWind, CloudDrizzle,
  CloudSnow, CloudLightning, CloudFog, Snowflake,
};

const nightMap = {
  Sun: Moon,
  CloudSun: CloudMoon,
};

export default function WeatherIcon({ name, size = 24, isDay = true, className = '' }) {
  let Icon = iconMap[name] || Cloud;
  if (!isDay && nightMap[name]) Icon = nightMap[name];
  return <Icon size={size} className={className} />;
}
