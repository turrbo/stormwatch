import { useMemo } from 'react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo, getTempClass } from '../utils/weatherCodes';
import { formatTemp, formatHour } from '../utils/formatters';
import { Droplets } from 'lucide-react';

export default function HourlyForecast({ weather }) {
  const hours = useMemo(() => {
    const h = weather.hourly;
    const now = new Date();
    const currentIdx = h.time.findIndex(t => new Date(t) >= now);
    const startIdx = Math.max(0, currentIdx - 1);
    return h.time.slice(startIdx, startIdx + 25).map((t, i) => {
      const idx = startIdx + i;
      return {
        time: t,
        temp: h.temperature_2m[idx],
        code: h.weather_code[idx],
        precip: h.precipitation_probability[idx],
        isDay: h.is_day[idx],
        wind: h.wind_speed_10m[idx],
      };
    });
  }, [weather]);

  return (
    <div className="glass-panel p-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-sm font-medium text-neutral-400 mb-3 px-1">24-Hour Forecast</h3>
      <div className="flex gap-1 overflow-x-auto hourly-scroll pb-2">
        {hours.map((h, i) => {
          const info = getWeatherInfo(h.code);
          const tempClass = getTempClass(h.temp);
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl
              hover:bg-neutral-700/30 transition-colors shrink-0 min-w-[60px]">
              <span className="text-xs text-neutral-500">{formatHour(h.time)}</span>
              <WeatherIcon name={info.icon} size={20} isDay={!!h.isDay} className="text-neutral-300" />
              <span className={`text-sm font-semibold ${tempClass}`}>{formatTemp(h.temp)}</span>
              {h.precip > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] text-red-400">
                  <Droplets size={8} />{h.precip}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
