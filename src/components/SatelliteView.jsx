import { useState } from 'react';
import { Satellite, Globe, Eye, RefreshCw, Layers } from 'lucide-react';
import { SAT_BANDS, SAT_SCALES, SAT_SECTORS, getSatelliteImageUrl } from '../services/codNexlabApi';

const BAND_KEYS = Object.keys(SAT_BANDS);
const SECTOR_KEYS = Object.keys(SAT_SECTORS);

export default function SatelliteView() {
  const [sector, setSector] = useState('conus');
  const [band, setBand] = useState('13');
  const [imgKey, setImgKey] = useState(0);

  const imgUrl = getSatelliteImageUrl('continental', sector, band);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Satellite size={20} className="text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Satellite Imagery</h3>
          <p className="text-sm text-slate-500">
            GOES-East/West imagery via COD NEXLAB
          </p>
        </div>
      </div>

      {/* Band selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Eye size={13} className="text-slate-500" />
        {BAND_KEYS.map(b => (
          <button key={b} onClick={() => setBand(b)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${band === b
                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {SAT_BANDS[b].label}
          </button>
        ))}
      </div>

      {/* Sector selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Layers size={13} className="text-slate-500" />
        {SECTOR_KEYS.map(s => (
          <button key={s} onClick={() => setSector(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${sector === s
                ? 'bg-red-500/25 text-red-300 border border-red-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {SAT_SECTORS[s]}
          </button>
        ))}
        <button onClick={() => setImgKey(k => k + 1)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 transition-all ml-auto flex items-center gap-1">
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      {/* Satellite image */}
      <div className="glass-panel overflow-hidden">
        <div className="relative bg-slate-900" style={{ minHeight: 400 }}>
          <img
            key={`${imgUrl}-${imgKey}`}
            src={`${imgUrl}?t=${Date.now()}-${imgKey}`}
            alt={`${SAT_BANDS[band]?.label} - ${SAT_SECTORS[sector]}`}
            className="w-full h-auto"
            onError={(e) => {
              e.target.alt = 'Image unavailable -- try a different band or sector';
              e.target.style.opacity = '0.3';
            }}
          />
        </div>
        <div className="px-4 py-2 border-t border-slate-700/30 text-xs text-slate-500">
          COD NEXLAB -- GOES / {SAT_BANDS[band]?.label} / {SAT_SECTORS[sector]} -- latest image
        </div>
      </div>

      {/* NOAA GOES direct imagery as backup */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/30 flex items-center gap-2">
          <Globe size={14} className="text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">NOAA GOES-East -- GeoColor CONUS</span>
        </div>
        <div className="relative bg-slate-900">
          <img
            src={`https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/1250x750.jpg?t=${Date.now()}`}
            alt="NOAA GOES-East GeoColor"
            className="w-full h-auto"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Satellite data from College of DuPage NEXLAB + NOAA GOES imagery
      </p>
    </div>
  );
}
