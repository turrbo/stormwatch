import { useState } from 'react';
import { Globe, Layers, Thermometer } from 'lucide-react';
import { VENTUSKY_LAYERS, getVentuskyEmbedUrl } from '../services/ventuskyApi';

const LAYER_KEYS = Object.keys(VENTUSKY_LAYERS);

export default function VentuskyMap({ location }) {
  const lat = location?.latitude || 39.8;
  const lon = location?.longitude || -98.5;
  const [layer, setLayer] = useState('temperature');
  const [iframeKey, setIframeKey] = useState(0);

  const switchLayer = (l) => {
    setLayer(l);
    setIframeKey(k => k + 1);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Globe size={20} className="text-orange-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Ventusky Maps</h3>
          <p className="text-sm text-slate-500">
            Animated global weather visualization -- 40+ models, 70+ layers
          </p>
        </div>
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
            {VENTUSKY_LAYERS[l]}
          </button>
        ))}
      </div>

      {/* Map embed */}
      <div className="rounded-2xl overflow-hidden border border-slate-700/50"
        style={{ height: 'calc(100vh - 260px)', minHeight: 500 }}>
        <iframe
          key={iframeKey}
          src={getVentuskyEmbedUrl(lat, lon, layer, 5)}
          className="w-full h-full border-0"
          title={`Ventusky - ${VENTUSKY_LAYERS[layer]}`}
          allow="fullscreen"
          allowFullScreen
        />
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Interactive weather maps from Ventusky -- supports ICON, GFS, ECMWF, HRRR, and 36+ more models
      </p>
    </div>
  );
}
