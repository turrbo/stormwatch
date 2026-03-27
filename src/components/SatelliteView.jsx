import { useState } from 'react';
import { Satellite, Globe, Eye } from 'lucide-react';
import { SAT_BANDS, SAT_SECTORS, getSatelliteImageUrl } from '../services/codNexlabApi';

const BAND_KEYS = Object.keys(SAT_BANDS);
const SECTOR_KEYS = Object.keys(SAT_SECTORS);
const GOES_SATS = [
  { id: 'goes16', label: 'GOES-East (16)' },
  { id: 'goes18', label: 'GOES-West (18)' },
];

export default function SatelliteView() {
  const [sat, setSat] = useState('goes16');
  const [sector, setSector] = useState('conus');
  const [band, setBand] = useState('truecolor');
  const [imgKey, setImgKey] = useState(0);

  // COD uses the band id in the URL path, and count=1 means "latest 1 frame"
  const bandId = SAT_BANDS[band]?.id || 'geocolor';
  const imgUrl = getSatelliteImageUrl(sat, sector, bandId, 1);

  const refreshImage = () => setImgKey(k => k + 1);

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
            GOES satellite imagery via COD NEXLAB + Zoom Earth global view
          </p>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap gap-3">
        {/* Satellite selector */}
        <div className="flex items-center gap-1.5">
          <Globe size={13} className="text-slate-500" />
          {GOES_SATS.map(s => (
            <button key={s.id} onClick={() => setSat(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${sat === s.id
                  ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/50'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Band selector */}
        <div className="flex items-center gap-1.5">
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
      </div>

      {/* Sector selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {SECTOR_KEYS.map(s => (
          <button key={s} onClick={() => setSector(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${sector === s
                ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {SAT_SECTORS[s]}
          </button>
        ))}
        <button onClick={refreshImage}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 transition-all ml-auto">
          Refresh
        </button>
      </div>

      {/* COD NEXLAB image */}
      <div className="glass-panel overflow-hidden">
        <div className="relative bg-slate-900" style={{ minHeight: 400 }}>
          <img
            key={`${imgUrl}-${imgKey}`}
            src={`${imgUrl}?t=${imgKey}`}
            alt={`${SAT_BANDS[band]?.label} - ${SAT_SECTORS[sector]}`}
            className="w-full h-auto"
            onError={(e) => {
              e.target.alt = 'Image unavailable - try a different band or sector';
              e.target.style.opacity = '0.3';
            }}
          />
        </div>
        <div className="px-4 py-2 border-t border-slate-700/30 text-xs text-slate-500">
          COD NEXLAB -- {GOES_SATS.find(s => s.id === sat)?.label} / {SAT_BANDS[band]?.label} / {SAT_SECTORS[sector]}
        </div>
      </div>

      {/* Zoom Earth global view */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/30 flex items-center gap-2">
          <Globe size={14} className="text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">Zoom Earth -- Global True Color</span>
        </div>
        <div style={{ height: 500 }}>
          <iframe
            src="https://zoom.earth/#view=39,-98,4z/layers=wind"
            className="w-full h-full border-0"
            title="Zoom Earth Global Satellite"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        GOES satellite data from College of DuPage NEXLAB -- Global imagery from Zoom Earth
      </p>
    </div>
  );
}
