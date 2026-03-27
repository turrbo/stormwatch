import { useState, useEffect } from 'react';
import { FileText, Building2, Radio, MapPin } from 'lucide-react';
import { fetchPoint, fetchForecastDiscussion, fetchNearestStations, fetchStationObservation } from '../services/weatherGovApi';

export default function NWSDiscussion({ location }) {
  const lat = location?.latitude;
  const lon = location?.longitude;
  const [wfo, setWfo] = useState(null);
  const [discussion, setDiscussion] = useState('');
  const [stations, setStations] = useState([]);
  const [stationObs, setStationObs] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('discussion');

  useEffect(() => {
    if (!lat || !lon) return;
    setLoading(true);

    Promise.allSettled([
      fetchPoint(lat, lon).then(async (point) => {
        const office = point?.properties?.cwa;
        if (office) {
          setWfo(office);
          const disc = await fetchForecastDiscussion(office);
          setDiscussion(disc || 'Discussion unavailable.');
        }
      }),
      fetchNearestStations(lat, lon).then(async (stns) => {
        setStations(stns.slice(0, 8));
        // Load obs for first 4
        const results = await Promise.allSettled(
          stns.slice(0, 4).map(s => fetchStationObservation(s.id))
        );
        const obsMap = {};
        results.forEach((r, i) => {
          if (r.status === 'fulfilled' && r.value) {
            obsMap[stns[i].id] = r.value;
          }
        });
        setStationObs(obsMap);
      }),
    ]).finally(() => setLoading(false));
  }, [lat, lon]);

  const loadObs = async (stationId) => {
    if (stationObs[stationId]) return;
    try {
      const obs = await fetchStationObservation(stationId);
      if (obs) setStationObs(prev => ({ ...prev, [stationId]: obs }));
    } catch { /* ignore */ }
  };

  const cToF = (c) => c != null ? ((c * 9/5) + 32).toFixed(0) : '--';
  const mpsToMph = (mps) => mps != null ? (mps * 2.237).toFixed(0) : '--';

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Building2 size={20} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">NWS Forecast Office</h3>
          <p className="text-sm text-slate-500">
            {wfo ? `WFO: ${wfo}` : 'Loading...'} -- Official forecast discussion and nearby ASOS/AWOS stations
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5">
        <button onClick={() => setTab('discussion')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${tab === 'discussion'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-200'}`}>
          <FileText size={14} /> Forecast Discussion
        </button>
        <button onClick={() => setTab('stations')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${tab === 'stations'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-200'}`}>
          <Radio size={14} /> ASOS/AWOS Stations
        </button>
      </div>

      {loading ? (
        <div className="glass-panel p-8 text-center">
          <Building2 size={32} className="text-blue-400/50 mx-auto mb-2 animate-pulse" />
          <p className="text-sm text-slate-500">Fetching NWS data...</p>
        </div>
      ) : (
        <>
          {/* Discussion */}
          {tab === 'discussion' && (
            <div className="glass-panel p-4">
              {discussion ? (
                <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono max-h-[65vh] overflow-y-auto">
                  {discussion}
                </pre>
              ) : (
                <p className="text-sm text-slate-500">No forecast discussion available.</p>
              )}
            </div>
          )}

          {/* Stations */}
          {tab === 'stations' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stations.map(s => {
                const obs = stationObs[s.id];
                return (
                  <div key={s.id}
                    className="glass-panel p-4 cursor-pointer hover:border-blue-500/30 transition-all"
                    onClick={() => loadObs(s.id)}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-semibold text-slate-200">{s.id}</span>
                        <p className="text-xs text-slate-500">{s.name}</p>
                      </div>
                      <MapPin size={14} className="text-blue-400" />
                    </div>
                    {obs ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-xs">
                          <span className="text-slate-500">Temp: </span>
                          <span className="text-orange-400 font-medium">{cToF(obs.temperature?.value)}°F</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-500">Dew: </span>
                          <span className="text-blue-400 font-medium">{cToF(obs.dewpoint?.value)}°F</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-500">Wind: </span>
                          <span className="text-slate-300 font-medium">{mpsToMph(obs.windSpeed?.value)} mph</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-500">Humidity: </span>
                          <span className="text-slate-300 font-medium">{obs.relativeHumidity?.value?.toFixed(0) || '--'}%</span>
                        </div>
                        {obs.textDescription && (
                          <div className="col-span-2 text-xs text-slate-400">{obs.textDescription}</div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">Click to load observation</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <p className="text-[11px] text-slate-600 text-center">
        Official NWS data via api.weather.gov -- authoritative US weather information
      </p>
    </div>
  );
}
