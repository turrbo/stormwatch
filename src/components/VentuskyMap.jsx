import { useState } from 'react';
import { Globe, Layers, ExternalLink } from 'lucide-react';

const WINDY_LAYERS = {
  wind: 'Wind',
  gust: 'Gusts',
  rain: 'Rain',
  temp: 'Temperature',
  clouds: 'Clouds',
  pressure: 'Pressure',
  humidity: 'Humidity',
  dewpoint: 'Dew Point',
  cape: 'CAPE',
  snowcover: 'Snow Cover',
  waves: 'Waves',
};

const WINDY_MODELS = {
  ecmwf: 'ECMWF',
  gfs: 'GFS',
  icon: 'ICON',
  iconEu: 'ICON-EU',
  nam: 'NAM',
};

const LAYER_KEYS = Object.keys(WINDY_LAYERS);
const MODEL_KEYS = Object.keys(WINDY_MODELS);

export default function VentuskyMap({ location }) {
  const lat = location?.latitude || 39.8;
  const lon = location?.longitude || -98.5;
  const [layer, setLayer] = useState('wind');
  const [model, setModel] = useState('ecmwf');
  const [iframeKey, setIframeKey] = useState(0);

  const switchLayer = (l) => {
    setLayer(l);
    setIframeKey(k => k + 1);
  };

  const switchModel = (m) => {
    setModel(m);
    setIframeKey(k => k + 1);
  };

  const embedUrl = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=imperial&metricWind=mph&zoom=5&overlay=${layer}&product=${model}&level=surface&lat=${lat}&lon=${lon}`;

  const ventuskyUrl = `https://www.ventusky.com/?p=${lat};${lon};5&l=${layer}`;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Globe size={20} className="text-orange-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Weather Maps</h3>
          <p className="text-sm text-slate-500">
            Animated global weather visualization -- Windy.com + 40+ models
          </p>
        </div>
      </div>

      {/* Model selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] text-slate-500 uppercase tracking-wide">Model</span>
        {MODEL_KEYS.map(m => (
          <button key={m} onClick={() => switchModel(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${model === m
                ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {WINDY_MODELS[m]}
          </button>
        ))}
      </div>

      {/* Layer selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Layers size={13} className="text-slate-500" />
        {LAYER_KEYS.map(l => (
          <button key={l} onClick={() => switchLayer(l)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${layer === l
                ? 'bg-orange-500/25 text-orange-300 border border-orange-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {WINDY_LAYERS[l]}
          </button>
        ))}
      </div>

      {/* Map embed -- Windy has proper embed support with no app banner */}
      <div className="rounded-2xl overflow-hidden border border-slate-700/50"
        style={{ height: 'calc(100vh - 300px)', minHeight: 500 }}>
        <iframe
          key={iframeKey}
          src={embedUrl}
          className="w-full h-full border-0"
          title={`Windy - ${WINDY_LAYERS[layer]} (${WINDY_MODELS[model]})`}
          allow="fullscreen"
          allowFullScreen
        />
      </div>

      {/* Link to Ventusky for alternative view */}
      <a href={ventuskyUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 hover:bg-orange-500/20 transition-all text-sm font-medium">
        <ExternalLink size={14} />
        Open in Ventusky (alternative view)
      </a>

      <p className="text-[11px] text-slate-600 text-center">
        Interactive weather maps from Windy.com -- ECMWF, GFS, ICON, HRRR and 36+ models
      </p>
    </div>
  );
}
