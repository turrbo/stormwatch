import { useState, useEffect } from 'react';
import { LineChart as LineChartIcon, Eye, ExternalLink } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WINDY_OVERLAYS = {
  temp: { label: 'Temperature', id: 'temp' },
  wind: { label: 'Wind', id: 'wind' },
  rain: { label: 'Rain', id: 'rain' },
  clouds: { label: 'Clouds', id: 'clouds' },
  pressure: { label: 'Pressure', id: 'pressure' },
  cape: { label: 'CAPE', id: 'cape' },
};

const OVERLAY_KEYS = Object.keys(WINDY_OVERLAYS);

export default function Meteograms({ location }) {
  const lat = location?.latitude || 40.71;
  const lon = location?.longitude || -74.01;
  const [overlay, setOverlay] = useState('temp');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hourly forecast from Open-Meteo for meteogram chart
  useEffect(() => {
    setLoading(true);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,surface_pressure,cape&forecast_days=7&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (!data.hourly) { setChartData([]); return; }
        const h = data.hourly;
        const points = h.time.map((t, i) => ({
          time: t,
          label: new Date(t).toLocaleDateString([], { weekday: 'short', hour: 'numeric' }),
          temp: h.temperature_2m?.[i],
          humidity: h.relative_humidity_2m?.[i],
          precip: h.precipitation?.[i],
          wind: h.windspeed_10m?.[i],
          pressure: h.surface_pressure?.[i],
          cape: h.cape?.[i],
        }));
        // Downsample to every 3 hours for readability
        setChartData(points.filter((_, i) => i % 3 === 0));
      })
      .catch(() => setChartData([]))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const windyUrl = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=imperial&metricWind=mph&zoom=7&overlay=${overlay}&product=ecmwf&level=surface&lat=${lat}&lon=${lon}`;

  const meteoblueUrl = `https://www.meteoblue.com/en/weather/forecast/multimodel/${lat}N${Math.abs(lon)}${lon >= 0 ? 'E' : 'W'}`;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
          <LineChartIcon size={20} className="text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-200">Meteograms</h3>
          <p className="text-sm text-neutral-500">
            Multi-model forecast charts for {location?.name || 'your location'}
          </p>
        </div>
      </div>

      {/* Open-Meteo hourly chart */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-700/30 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">
            7-Day Hourly Forecast (Open-Meteo)
          </span>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-neutral-500 animate-pulse">Loading forecast data...</p>
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-neutral-500">No forecast data available</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Temperature + Precip chart */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 mb-2">Temperature (F) + Precipitation (in)</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#737373' }} interval={7} angle={-30} textAnchor="end" height={50} />
                    <YAxis yAxisId="temp" tick={{ fontSize: 10, fill: '#737373' }} />
                    <YAxis yAxisId="precip" orientation="right" tick={{ fontSize: 10, fill: '#737373' }} />
                    <Tooltip contentStyle={{ background: '#262626', border: '1px solid #404040', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={false} name="Temp (F)" />
                    <Line yAxisId="precip" type="monotone" dataKey="precip" stroke="#C8102E" strokeWidth={1.5} dot={false} name="Precip (in)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Wind + Humidity chart */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 mb-2">Wind Speed (mph) + Humidity (%)</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#737373' }} interval={7} angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10, fill: '#737373' }} />
                    <Tooltip contentStyle={{ background: '#262626', border: '1px solid #404040', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="wind" stroke="#22d3ee" strokeWidth={2} dot={false} name="Wind (mph)" />
                    <Line type="monotone" dataKey="humidity" stroke="#a78bfa" strokeWidth={1.5} dot={false} name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Windy.com animated map */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-700/30 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">Animated Model Map (Windy / ECMWF)</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap px-4 py-2 border-b border-neutral-700/20">
          {OVERLAY_KEYS.map(o => (
            <button key={o} onClick={() => setOverlay(o)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${overlay === o
                  ? 'bg-pink-500/25 text-pink-300 border border-pink-500/50'
                  : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
              {WINDY_OVERLAYS[o].label}
            </button>
          ))}
        </div>
        <div style={{ height: 400 }}>
          <iframe
            src={windyUrl}
            className="w-full h-full border-0"
            title={`Windy - ${WINDY_OVERLAYS[overlay]?.label}`}
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Link to Meteoblue for multi-model comparison */}
      <a href={meteoblueUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500/20 transition-all text-sm font-medium">
        <ExternalLink size={16} />
        View 17-Model Comparison on Meteoblue
      </a>

      <p className="text-[11px] text-neutral-600 text-center">
        Forecast data from Open-Meteo + animated maps from Windy.com (ECMWF) + Meteoblue multi-model
      </p>
    </div>
  );
}
