import { useState, useEffect } from 'react';
import { History, Calendar, TrendingUp, Thermometer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchHistoricalWeather, fetchThisDayInHistory } from '../services/historicalApi';

export default function HistoricalWeather({ location }) {
  const lat = location?.latitude;
  const lon = location?.longitude;
  const [mode, setMode] = useState('thisday');
  const [thisDayData, setThisDayData] = useState([]);
  const [rangeData, setRangeData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default date range (last 30 days)
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }, []);

  // Load "This Day in History"
  useEffect(() => {
    if (mode !== 'thisday' || !lat || !lon) return;
    setLoading(true);
    fetchThisDayInHistory(lat, lon)
      .then(setThisDayData)
      .catch(() => setThisDayData([]))
      .finally(() => setLoading(false));
  }, [mode, lat, lon]);

  // Load range data
  const loadRange = async () => {
    if (!startDate || !endDate || !lat || !lon) return;
    setLoading(true);
    try {
      const data = await fetchHistoricalWeather(lat, lon, startDate, endDate);
      setRangeData(data);
    } catch {
      setRangeData(null);
    }
    setLoading(false);
  };

  const rangeChartData = rangeData?.daily?.time?.map((t, i) => ({
    date: t,
    high: rangeData.daily.temperature_2m_max?.[i],
    low: rangeData.daily.temperature_2m_min?.[i],
    precip: rangeData.daily.precipitation_sum?.[i],
    wind: rangeData.daily.wind_speed_10m_max?.[i],
  })) || [];

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
          <History size={20} className="text-violet-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Historical Weather</h3>
          <p className="text-sm text-slate-500">
            Open-Meteo archive data back to 1940 for {location?.name || 'your location'}
          </p>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center gap-1.5">
        <button onClick={() => setMode('thisday')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${mode === 'thisday'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-200'}`}>
          <Calendar size={14} /> This Day in History
        </button>
        <button onClick={() => setMode('range')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${mode === 'range'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-200'}`}>
          <TrendingUp size={14} /> Date Range
        </button>
      </div>

      {/* This Day in History */}
      {mode === 'thisday' && (
        <div className="space-y-3">
          {loading ? (
            <div className="glass-panel p-8 text-center">
              <History size={32} className="text-violet-400/50 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-slate-500">Loading historical data...</p>
            </div>
          ) : thisDayData.length > 0 ? (
            <>
              <div className="glass-panel p-4">
                <h4 className="text-sm font-medium text-slate-400 mb-3">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} -- Last 10 Years
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={thisDayData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Bar dataKey="tempMax" fill="#f97316" name="High" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="tempMin" fill="#60a5fa" name="Low" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {thisDayData.slice(-5).map(d => (
                  <div key={d.year} className="glass-panel-light p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">{d.year}</div>
                    <div className="text-sm font-semibold text-orange-400">{d.tempMax?.toFixed(0)}°</div>
                    <div className="text-sm font-semibold text-blue-400">{d.tempMin?.toFixed(0)}°</div>
                    {d.precip > 0 && (
                      <div className="text-[10px] text-blue-300 mt-0.5">{d.precip.toFixed(2)}" rain</div>
                    )}
                    {d.snow > 0 && (
                      <div className="text-[10px] text-sky-300 mt-0.5">{d.snow.toFixed(1)}" snow</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="glass-panel p-6 text-center text-sm text-slate-500">
              No historical data available for this date.
            </div>
          )}
        </div>
      )}

      {/* Date Range */}
      {mode === 'range' && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">From</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-800 border border-slate-600/50 rounded-lg px-3 py-1.5 text-sm text-slate-200" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">To</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-800 border border-slate-600/50 rounded-lg px-3 py-1.5 text-sm text-slate-200" />
            </div>
            <button onClick={loadRange}
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-violet-500/20 text-violet-300 border border-violet-500/40 hover:bg-violet-500/30 transition-all">
              Load
            </button>
          </div>

          {loading && (
            <div className="glass-panel p-8 text-center">
              <TrendingUp size={32} className="text-violet-400/50 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-slate-500">Loading...</p>
            </div>
          )}

          {rangeChartData.length > 0 && (
            <>
              <div className="glass-panel p-4">
                <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-1.5">
                  <Thermometer size={14} /> Temperature Range
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={rangeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }}
                      tickFormatter={(v) => v.slice(5)} interval="preserveStartEnd" />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Area type="monotone" dataKey="high" stroke="#f97316" fill="#f97316" fillOpacity={0.15} name="High" />
                    <Area type="monotone" dataKey="low" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.15} name="Low" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-panel p-4">
                <h4 className="text-sm font-medium text-slate-400 mb-3">Precipitation</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={rangeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }}
                      tickFormatter={(v) => v.slice(5)} interval="preserveStartEnd" />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                    />
                    <Bar dataKey="precip" fill="#3b82f6" name="Precip (in)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      )}

      <p className="text-[11px] text-slate-600 text-center">
        Historical data from Open-Meteo Archive (ERA5 reanalysis) -- available back to 1940
      </p>
    </div>
  );
}
