import { useState } from 'react';
import { ChevronDown, ChevronUp, Droplets, Wind, Sun } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo, getTempClass } from '../utils/weatherCodes';
import { formatTemp, formatDayName, formatFullDate, formatTime, formatWindDirection } from '../utils/formatters';

export default function DailyForecast({ weather }) {
  const [expanded, setExpanded] = useState(null);
  const d = weather.daily;

  return (
    <div className="glass-panel p-4 animate-slide-up">
      <h3 className="text-sm font-medium text-neutral-400 mb-3 px-1">10-Day Forecast</h3>
      <div className="space-y-1">
        {d.time.map((day, i) => {
          const info = getWeatherInfo(d.weather_code[i]);
          const isExpanded = expanded === i;
          const maxTemp = d.temperature_2m_max[i];
          const minTemp = d.temperature_2m_min[i];
          const allMax = Math.max(...d.temperature_2m_max);
          const allMin = Math.min(...d.temperature_2m_min);
          const range = allMax - allMin || 1;
          const barLeft = ((minTemp - allMin) / range) * 100;
          const barWidth = ((maxTemp - minTemp) / range) * 100;

          return (
            <div key={day} className="rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-neutral-700/30 transition-colors"
              >
                <span className="text-sm text-neutral-300 w-20 text-left">
                  {formatDayName(day)}
                  <span className="text-xs text-neutral-600 ml-1">{formatFullDate(day)}</span>
                </span>
                <WeatherIcon name={info.icon} size={20} className="text-neutral-300 shrink-0" />
                {d.precipitation_probability_max[i] > 0 && (
                  <span className="flex items-center gap-0.5 text-xs text-red-400 w-10">
                    <Droplets size={10} />{d.precipitation_probability_max[i]}%
                  </span>
                )}
                {!d.precipitation_probability_max[i] && <span className="w-10" />}
                <span className={`text-sm font-medium w-10 text-right ${getTempClass(minTemp)}`}>
                  {formatTemp(minTemp)}
                </span>
                <div className="flex-1 h-1.5 bg-neutral-800 rounded-full relative mx-1 min-w-[60px]">
                  <div className="absolute h-full rounded-full"
                    style={{
                      left: `${barLeft}%`, width: `${Math.max(barWidth, 4)}%`,
                      background: `linear-gradient(90deg, #ef4444, #f97316)`,
                    }} />
                </div>
                <span className={`text-sm font-semibold w-10 text-left ${getTempClass(maxTemp)}`}>
                  {formatTemp(maxTemp)}
                </span>
                {isExpanded ? <ChevronUp size={14} className="text-neutral-500" /> : <ChevronDown size={14} className="text-neutral-500" />}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-fade-in">
                  <MiniStat icon={Wind} label="Wind" value={`${Math.round(d.wind_speed_10m_max[i])} mph ${formatWindDirection(d.wind_direction_10m_dominant[i])}`} />
                  <MiniStat icon={Wind} label="Gusts" value={`${Math.round(d.wind_gusts_10m_max[i])} mph`} />
                  <MiniStat icon={Droplets} label="Precip" value={`${d.precipitation_sum[i].toFixed(2)} in`} />
                  <MiniStat icon={Sun} label="UV Index" value={d.uv_index_max[i].toFixed(1)} />
                  <MiniStat label="Feels Hi" value={formatTemp(d.apparent_temperature_max[i])} />
                  <MiniStat label="Feels Lo" value={formatTemp(d.apparent_temperature_min[i])} />
                  <MiniStat label="Sunrise" value={formatTime(d.sunrise[i])} />
                  <MiniStat label="Sunset" value={formatTime(d.sunset[i])} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="glass-panel-light p-2">
      <div className="flex items-center gap-1 text-neutral-500 text-[10px] mb-0.5">
        {Icon && <Icon size={10} />}
        <span>{label}</span>
      </div>
      <div className="text-xs font-medium text-neutral-300">{value}</div>
    </div>
  );
}
