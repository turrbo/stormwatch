import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Thermometer, ArrowUp } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo, getTempClass } from '../utils/weatherCodes';
import { formatTemp, formatTime, formatWindDirection } from '../utils/formatters';

export default function CurrentWeather({ weather }) {
  const c = weather.current;
  const d = weather.daily;
  const info = getWeatherInfo(c.weather_code);
  const tempClass = getTempClass(c.temperature_2m);

  return (
    <div className="glass-panel glow-border p-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 mb-1">
            <WeatherIcon name={info.icon} size={48} isDay={!!c.is_day} className="text-blue-400" />
            <span className={`text-6xl font-light ${tempClass}`}>
              {formatTemp(c.temperature_2m)}
            </span>
          </div>
          <p className="text-lg text-slate-300 mt-1">{info.label}</p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            <Thermometer size={12} />
            Feels like {formatTemp(c.apparent_temperature)}
          </p>
          <div className="flex gap-3 mt-2 text-sm text-slate-400">
            <span className="text-orange-400">H: {formatTemp(d.temperature_2m_max[0])}</span>
            <span className="text-blue-400">L: {formatTemp(d.temperature_2m_min[0])}</span>
          </div>
        </div>

        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
          <DetailCard icon={Wind} label="Wind" value={`${Math.round(c.wind_speed_10m)} mph`}
            sub={`Gusts ${Math.round(c.wind_gusts_10m)} mph ${formatWindDirection(c.wind_direction_10m)}`} />
          <DetailCard icon={Droplets} label="Humidity" value={`${c.relative_humidity_2m}%`}
            sub={`Dew point ${formatTemp(c.apparent_temperature)}`} />
          <DetailCard icon={Gauge} label="Pressure" value={`${c.pressure_msl.toFixed(0)} hPa`}
            sub="Sea level" />
          <DetailCard icon={Eye} label="Cloud Cover" value={`${c.cloud_cover}%`}
            sub={c.cloud_cover < 25 ? 'Clear' : c.cloud_cover < 50 ? 'Partly cloudy' : 'Overcast'} />
          <DetailCard icon={Sunrise} label="Sunrise" value={formatTime(d.sunrise[0])} sub="" />
          <DetailCard icon={Sunset} label="Sunset" value={formatTime(d.sunset[0])} sub="" />
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="glass-panel-light p-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
        <Icon size={12} />
        <span>{label}</span>
      </div>
      <div className="text-sm font-semibold text-slate-200">{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
