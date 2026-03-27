import { useState } from 'react';
import { LineChart, Eye } from 'lucide-react';
import { METEOGRAM_TYPES, getMeteogramUrl } from '../services/meteoblueApi';

const TYPE_KEYS = Object.keys(METEOGRAM_TYPES);

export default function Meteograms({ location }) {
  const lat = location?.latitude || 40.71;
  const lon = location?.longitude || -74.01;
  const [type, setType] = useState('multimodel');

  const embedUrl = getMeteogramUrl(lat, lon, type);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
          <LineChart size={20} className="text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Meteograms</h3>
          <p className="text-sm text-slate-500">
            Multi-model forecast charts via Meteoblue for {location?.name || 'your location'}
          </p>
        </div>
      </div>

      {/* Type selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {TYPE_KEYS.map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${type === t
                ? 'bg-pink-500/25 text-pink-300 border border-pink-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            <div>{METEOGRAM_TYPES[t].label}</div>
          </button>
        ))}
      </div>

      <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center gap-2">
        <Eye size={14} className="text-pink-400 shrink-0" />
        <span className="text-xs text-pink-300">
          {METEOGRAM_TYPES[type]?.desc} -- Shows agreement/divergence between up to 17 weather models
        </span>
      </div>

      {/* Meteogram embed */}
      <div className="glass-panel overflow-hidden">
        <div style={{ height: 'calc(100vh - 300px)', minHeight: 500 }}>
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title={`Meteoblue ${METEOGRAM_TYPES[type]?.label} Meteogram`}
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Meteogram charts from Meteoblue -- compares ECMWF, GFS, ICON, and 14 other models
      </p>
    </div>
  );
}
