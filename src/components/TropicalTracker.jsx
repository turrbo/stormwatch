import { useState } from 'react';
import { CloudLightning, Globe, Satellite as SatIcon } from 'lucide-react';

const BASINS = [
  { id: 'atl', label: 'Atlantic' },
  { id: 'epac', label: 'E. Pacific' },
  { id: 'wpac', label: 'W. Pacific' },
  { id: 'io', label: 'Indian Ocean' },
  { id: 'shem', label: 'S. Hemisphere' },
];

const SAT_PRODUCTS = [
  { id: 'ir', label: 'Infrared' },
  { id: 'vis', label: 'Visible' },
  { id: 'wv', label: 'Water Vapor' },
  { id: 'rgb', label: 'True Color' },
];

export default function TropicalTracker() {
  const [basin, setBasin] = useState('atl');
  const [satProduct, setSatProduct] = useState('ir');

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
          <CloudLightning size={20} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Tropical Tracker</h3>
          <p className="text-sm text-slate-500">
            Hurricane/cyclone tracking via Tropical Tidbits satellite imagery
          </p>
        </div>
      </div>

      {/* Basin selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Globe size={13} className="text-slate-500" />
        {BASINS.map(b => (
          <button key={b.id} onClick={() => setBasin(b.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${basin === b.id
                ? 'bg-red-500/25 text-red-300 border border-red-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {b.label}
          </button>
        ))}
      </div>

      {/* Satellite product */}
      <div className="flex items-center gap-1.5">
        <SatIcon size={13} className="text-slate-500" />
        {SAT_PRODUCTS.map(p => (
          <button key={p.id} onClick={() => setSatProduct(p.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${satProduct === p.id
                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Tropical Tidbits embed */}
      <div className="glass-panel overflow-hidden">
        <div style={{ height: 'calc(100vh - 310px)', minHeight: 500 }}>
          <iframe
            src={`https://www.tropicaltidbits.com/sat/${basin}/`}
            className="w-full h-full border-0"
            title={`Tropical Satellite - ${BASINS.find(b => b.id === basin)?.label}`}
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Storm info embed */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/30 flex items-center gap-2">
          <CloudLightning size={14} className="text-red-400" />
          <span className="text-sm font-medium text-slate-300">Active Tropical Systems</span>
        </div>
        <div style={{ height: 400 }}>
          <iframe
            src="https://www.tropicaltidbits.com/storminfo/"
            className="w-full h-full border-0"
            title="Active Tropical Systems"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Tropical cyclone data and satellite imagery from Tropical Tidbits
      </p>
    </div>
  );
}
