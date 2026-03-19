import { useState } from 'react';
import { Camera, Maximize2, Minimize2, MapPin } from 'lucide-react';

const CAMERAS = [
  {
    id: 'rnXIjl_Rzy4',
    label: 'Times Square, NYC',
    city: 'New York',
    region: 'Northeast',
  },
  {
    id: 'TMXXzJZiChc',
    label: 'NYC Weather Cam',
    city: 'New York',
    region: 'Northeast',
  },
  {
    id: 'rV_RZ_xKxHM',
    label: 'NYC Skyline View',
    city: 'New York',
    region: 'Northeast',
  },
  {
    id: 'EO_1LWqsCNE',
    label: 'Venice Beach, LA',
    city: 'Los Angeles',
    region: 'West',
  },
  {
    id: 'KCcNxl2ZppI',
    label: 'Fremont St, Las Vegas',
    city: 'Las Vegas',
    region: 'West',
  },
  {
    id: 'ZksWoEAhmTU',
    label: 'St. George St, St. Augustine',
    city: 'St. Augustine',
    region: 'Southeast',
  },
  {
    id: 'EFum1rGUdkk',
    label: 'Top Webcams Worldwide',
    city: 'Global',
    region: 'Other',
  },
  {
    id: 'Jgp4JDG-nsk',
    label: 'USA City Tour (Vegas, NYC, Miami)',
    city: 'Multi-City',
    region: 'Other',
  },
];

const REGIONS = ['All', ...new Set(CAMERAS.map(c => c.region))];

export default function Cameras() {
  const [expanded, setExpanded] = useState(null);
  const [region, setRegion] = useState('All');

  const filtered = region === 'All' ? CAMERAS : CAMERAS.filter(c => c.region === region);

  if (expanded) {
    const cam = CAMERAS.find(c => c.id === expanded);
    return (
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-purple-400" />
            <span className="text-sm font-medium text-slate-200">{cam?.label}</span>
            <span className="text-xs text-slate-500">{cam?.city}</span>
          </div>
          <button
            onClick={() => setExpanded(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 hover:bg-slate-700/50 transition-all"
          >
            <Minimize2 size={13} />
            Back to Grid
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-700/50"
          style={{ height: 'calc(100vh - 210px)', minHeight: 450 }}>
          <iframe
            src={`https://www.youtube.com/embed/${expanded}?autoplay=1&mute=1&rel=0`}
            className="w-full h-full border-0"
            title={cam?.label || 'Live Camera'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Camera size={20} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Live Weather Cameras</h3>
          <p className="text-sm text-slate-500">
            24/7 live streams -- click any feed to expand
          </p>
        </div>
      </div>

      {/* Region filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {REGIONS.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${region === r
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 hover:bg-slate-700/50'}`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Camera grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(cam => (
          <div key={cam.id} className="glass-panel overflow-hidden group">
            <div className="relative" style={{ height: 260 }}>
              <iframe
                src={`https://www.youtube.com/embed/${cam.id}?autoplay=0&mute=1&rel=0`}
                className="w-full h-full border-0"
                title={cam.label}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setExpanded(cam.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/80
                  opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                title="Expand"
              >
                <Maximize2 size={14} />
              </button>
            </div>
            <div className="px-3 py-2 flex items-center gap-2">
              <MapPin size={12} className="text-purple-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300 truncate">{cam.label}</span>
              <span className="text-[10px] text-slate-500 ml-auto shrink-0">{cam.city}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Live camera feeds via YouTube -- streams are maintained by third-party broadcasters
      </p>
    </div>
  );
}
