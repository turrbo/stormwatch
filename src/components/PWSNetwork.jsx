import { useState, useEffect } from 'react';
import { Radio, Thermometer, Droplets, Wind, ArrowUp, RefreshCw } from 'lucide-react';
import { fetchNearbyPWS, fetchPWSCurrent } from '../services/wundergroundApi';

export default function PWSNetwork({ location }) {
  const lat = location?.latitude;
  const lon = location?.longitude;
  const [stations, setStations] = useState([]);
  const [stationData, setStationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    setLoading(true);
    fetchNearbyPWS(lat, lon)
      .then(async (nearby) => {
        setStations(nearby.slice(0, 12));
        // Load current data for first 6 stations
        const first6 = nearby.slice(0, 6);
        const results = await Promise.allSettled(
          first6.map(s => fetchPWSCurrent(s.stationId))
        );
        const dataMap = {};
        results.forEach((r, i) => {
          if (r.status === 'fulfilled' && r.value) {
            dataMap[first6[i].stationId] = r.value;
          }
        });
        setStationData(dataMap);
      })
      .catch(() => setStations([]))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const loadStationData = async (stationId) => {
    if (stationData[stationId]) return;
    try {
      const data = await fetchPWSCurrent(stationId);
      if (data) setStationData(prev => ({ ...prev, [stationId]: data }));
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <Radio size={20} className="text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-200">Personal Weather Stations</h3>
          <p className="text-sm text-neutral-500">
            Hyper-local data from Weather Underground citizen stations near {location?.name || 'you'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel p-8 text-center">
          <Radio size={32} className="text-green-400/50 mx-auto mb-2 animate-pulse" />
          <p className="text-sm text-neutral-500">Finding nearby stations...</p>
        </div>
      ) : stations.length === 0 ? (
        <div className="glass-panel p-8 text-center">
          <Radio size={32} className="text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-500">No personal weather stations found nearby.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stations.map(s => {
            const data = stationData[s.stationId];
            const imp = data?.imperial;
            return (
              <div key={s.stationId}
                className="glass-panel p-4 hover:border-green-500/30 transition-all cursor-pointer"
                onClick={() => { setExpanded(expanded === s.stationId ? null : s.stationId); loadStationData(s.stationId); }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200">{s.stationId}</h4>
                    <p className="text-xs text-neutral-500">
                      {s.neighborhood || s.city}{s.state ? `, ${s.state}` : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    {s.distanceMi != null && (
                      <span className="text-[10px] text-neutral-500">{s.distanceMi.toFixed(1)} mi</span>
                    )}
                  </div>
                </div>

                {imp ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-neutral-500">
                        <Thermometer size={11} /> Temp
                      </span>
                      <span className="text-lg font-semibold text-orange-400">{imp.temp != null ? `${imp.temp}°F` : '--'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {data.humidity != null && <MiniPWSStat icon={Droplets} label="Humidity" value={`${data.humidity}%`} />}
                      {imp.windSpeed != null && <MiniPWSStat icon={Wind} label="Wind" value={`${imp.windSpeed} mph`} />}
                      {imp.windGust != null && imp.windGust > 0 && (
                        <MiniPWSStat icon={ArrowUp} label="Gusts" value={`${imp.windGust} mph`} />
                      )}
                      {imp.precipRate != null && imp.precipRate > 0 && (
                        <MiniPWSStat icon={Droplets} label="Rain Rate" value={`${imp.precipRate} in/hr`} />
                      )}
                      {imp.pressure != null && <MiniPWSStat label="Pressure" value={`${imp.pressure} inHg`} />}
                      {imp.precipTotal != null && imp.precipTotal > 0 && (
                        <MiniPWSStat label="Rain Today" value={`${imp.precipTotal} in`} />
                      )}
                    </div>
                    {data.obsTimeLocal && (
                      <p className="text-[10px] text-neutral-600 mt-1">
                        Updated: {new Date(data.obsTimeLocal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Loading...</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-neutral-600 text-center">
        Personal weather station data from Weather Underground -- tens of thousands of citizen stations
      </p>
    </div>
  );
}

function MiniPWSStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1 text-[10px] text-neutral-500">
        {Icon && <Icon size={10} />} {label}
      </span>
      <span className="text-xs font-medium text-neutral-300">{value}</span>
    </div>
  );
}
