import { useState } from 'react';
import { BarChart3, Layers, MapPin, RefreshCw, Thermometer, Wind, Droplets, Zap, Snowflake, CloudRain, Gauge } from 'lucide-react';

const MODEL_OPTIONS = [
  { id: 'gfs', label: 'GFS' },
  { id: 'ecmwf', label: 'ECMWF' },
  { id: 'icon', label: 'ICON' },
  { id: 'mblue', label: 'MeteoBlue' },
];

const OVERLAY_OPTIONS = [
  { id: 'temp', label: 'Temperature', icon: Thermometer },
  { id: 'wind', label: 'Wind', icon: Wind },
  { id: 'rainAccu', label: 'Rain Accum', icon: Droplets },
  { id: 'snowAccu', label: 'Snow Accum', icon: Snowflake },
  { id: 'cape', label: 'CAPE', icon: Zap },
  { id: 'pressure', label: 'Pressure', icon: Gauge },
  { id: 'clouds', label: 'Clouds', icon: CloudRain },
  { id: 'rain', label: 'Rain Rate', icon: CloudRain },
];

const NOAA_PRODUCTS = [
  { label: 'Surface Analysis', url: 'https://www.wpc.ncep.noaa.gov/sfc/namussfcwbg.gif' },
  { label: 'QPF Day 1 (24h)', url: 'https://www.wpc.ncep.noaa.gov/qpf/fill_94qwbg.gif' },
  { label: 'QPF Day 2 (24h)', url: 'https://www.wpc.ncep.noaa.gov/qpf/fill_98qwbg.gif' },
  { label: '5-Day Precip Accum', url: 'https://www.wpc.ncep.noaa.gov/qpf/p120i.gif' },
  { label: 'Nat. Forecast Day 1', url: 'https://www.wpc.ncep.noaa.gov/noaa/noaad1.gif' },
  { label: 'Nat. Forecast Day 2', url: 'https://www.wpc.ncep.noaa.gov/noaa/noaad2.gif' },
];

const TABS = [
  { id: 'interactive', label: 'Interactive Models' },
  { id: 'noaa', label: 'NOAA Products' },
  { id: 'spotwx', label: 'SpotWX Point' },
];

function buildWindyUrl(lat, lon, zoom, overlay, product) {
  return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0F&metricWind=mph&zoom=${zoom}&overlay=${overlay}&product=${product}&level=surface&lat=${lat}&lon=${lon}&message=true`;
}

export default function ModelsView({ location }) {
  const lat = location?.latitude || 39.8;
  const lon = location?.longitude || -98.5;
  const [tab, setTab] = useState('interactive');
  const [model, setModel] = useState('gfs');
  const [overlay, setOverlay] = useState('temp');
  const [iframeKey, setIframeKey] = useState(0);
  const [imgKey, setImgKey] = useState(Date.now());

  // SpotWX state
  const [spotModel, setSpotModel] = useState('gfs');

  const spotModels = [
    { id: 'gfs', label: 'GFS' },
    { id: 'hrrr', label: 'HRRR' },
    { id: 'nam', label: 'NAM' },
    { id: 'ecmwf', label: 'ECMWF' },
    { id: 'gem_glb', label: 'GEM Global' },
    { id: 'icon-eu', label: 'ICON-EU' },
  ];

  const switchModelOverlay = (newModel, newOverlay) => {
    if (newModel !== undefined) setModel(newModel);
    if (newOverlay !== undefined) setOverlay(newOverlay);
    setIframeKey(k => k + 1);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <BarChart3 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-200">NWP Models</h3>
          <p className="text-sm text-neutral-500">
            Interactive model maps, NOAA products, and point forecasts
          </p>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex items-center gap-1.5">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === t.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-neutral-800/40 text-neutral-400 border border-neutral-700/30 hover:text-neutral-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Interactive Models (Windy embed) */}
      {tab === 'interactive' && (
        <div className="space-y-3">
          {/* Model selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Layers size={13} className="text-neutral-500" />
            {MODEL_OPTIONS.map(m => (
              <button key={m.id} onClick={() => switchModelOverlay(m.id, undefined)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${model === m.id
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
                {m.label}
              </button>
            ))}
          </div>

          {/* Overlay selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <BarChart3 size={13} className="text-neutral-500" />
            {OVERLAY_OPTIONS.map(o => {
              const Icon = o.icon;
              return (
                <button key={o.id} onClick={() => switchModelOverlay(undefined, o.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${overlay === o.id
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                      : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
                  <Icon size={11} /> {o.label}
                </button>
              );
            })}
          </div>

          {/* Windy embed */}
          <div className="rounded-2xl overflow-hidden border border-neutral-700/50"
            style={{ height: 'calc(100vh - 320px)', minHeight: 450 }}>
            <iframe
              key={iframeKey}
              src={buildWindyUrl(lat, lon, 5, overlay, model)}
              className="w-full h-full border-0"
              title={`${MODEL_OPTIONS.find(m => m.id === model)?.label} - ${OVERLAY_OPTIONS.find(o => o.id === overlay)?.label}`}
              allow="fullscreen"
              allowFullScreen
            />
          </div>
          <p className="text-[11px] text-neutral-600 text-center">
            Interactive model visualization powered by Windy.com -- zoom, pan, and click for details
          </p>
        </div>
      )}

      {/* NOAA Products */}
      {tab === 'noaa' && (
        <div className="space-y-3">
          <div className="flex items-center justify-end">
            <button onClick={() => setImgKey(Date.now())}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 transition-all">
              <RefreshCw size={11} /> Refresh All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NOAA_PRODUCTS.map(p => (
              <div key={p.label} className="glass-panel overflow-hidden">
                <div className="px-3 py-2 border-b border-neutral-700/30 text-xs font-medium text-neutral-400">
                  {p.label}
                </div>
                <img
                  key={`${p.label}-${imgKey}`}
                  src={`${p.url}?t=${imgKey}`}
                  alt={p.label}
                  className="w-full h-auto bg-neutral-800"
                  style={{ minHeight: 200 }}
                  onError={(e) => { e.target.style.opacity = '0.3'; }}
                />
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-600 text-center">
            Products from NOAA Weather Prediction Center (WPC) -- public US government data
          </p>
        </div>
      )}

      {/* SpotWX Point Forecast */}
      {tab === 'spotwx' && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-300">
              SpotWX provides point-specific model data. Showing forecast for current location ({lat.toFixed(2)}, {lon.toFixed(2)}).
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {spotModels.map(m => (
              <button key={m.id} onClick={() => setSpotModel(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${spotModel === m.id
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
                {m.label}
              </button>
            ))}
          </div>

          <div className="glass-panel overflow-hidden">
            <div style={{ height: 'calc(100vh - 360px)', minHeight: 500 }}>
              <iframe
                src={`https://spotwx.com/products/grib_index.php?model=${spotModel}&lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&tz=America%2FNew_York&display=table`}
                className="w-full h-full border-0"
                title={`SpotWX - ${spotModels.find(m => m.id === spotModel)?.label}`}
                allow="fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
