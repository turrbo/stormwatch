import { useState } from 'react';
import { Camera, Maximize2, Minimize2, MapPin, Train, Radio, Waves } from 'lucide-react';

const CAMERAS = [
  // --- NORTHEAST ---
  { id: 'rnXIjl_Rzy4', label: 'Times Square 4K (EarthCam)', city: 'New York, NY', region: 'Northeast', type: 'city' },
  { id: 'VGnFLdQW39A', label: '24/7 NYC Live Cam', city: 'New York, NY', region: 'Northeast', type: 'city' },
  { id: '4qyZLflp-sI', label: 'Times Square: 1560 Broadway', city: 'New York, NY', region: 'Northeast', type: 'city' },
  { id: 'rV_RZ_xKxHM', label: 'NYC Skyline from Queens', city: 'New York, NY', region: 'Northeast', type: 'city' },
  { id: 'TMXXzJZiChc', label: 'NYC Weather Cam', city: 'New York, NY', region: 'Northeast', type: 'weather' },
  { id: 'OgqbZLzEbQU', label: 'NYC Harbor, Brooklyn', city: 'New York, NY', region: 'Northeast', type: 'harbor' },
  { id: 'SmO5qmzhMk0', label: 'Sandy Hook Bay / NYC Skyline', city: 'Highlands, NJ', region: 'Northeast', type: 'harbor' },
  { id: 'Zz9hMrxl20I', label: 'Public Square, Watertown', city: 'Watertown, NY', region: 'Northeast', type: 'city' },
  { id: 'JEtvLd4B-AY', label: 'News 12 NY/NJ/CT Live', city: 'Tri-State Area', region: 'Northeast', type: 'news' },
  { id: 'sNi1KbGCJ3o', label: '6abc Philadelphia Live', city: 'Philadelphia, PA', region: 'Northeast', type: 'news' },
  { id: 'Vi0JiFqB5dc', label: 'I-93 Traffic Cam, Londonderry', city: 'Londonderry, NH', region: 'Northeast', type: 'traffic' },
  { id: 'AgrYGFuW13g', label: 'Railcam, New London', city: 'New London, CT', region: 'Northeast', type: 'rail' },
  { id: 'Dv2XxhsWqWY', label: 'SoNo Tower Rail Cam', city: 'South Norwalk, CT', region: 'Northeast', type: 'rail' },
  { id: 'lUMGsNe-R9Q', label: 'Johnstown Rail Cam', city: 'Johnstown, PA', region: 'Northeast', type: 'rail' },

  // --- MID-ATLANTIC / DC ---
  { id: 'Mm-yAD8E3SU', label: 'Union Station DC Railcam', city: 'Washington, DC', region: 'Mid-Atlantic', type: 'rail' },
  { id: 'wgkdREYOfw0', label: 'Ashland Rail Cam (PTZ)', city: 'Ashland, VA', region: 'Mid-Atlantic', type: 'rail' },

  // --- SOUTHEAST ---
  { id: 'ZksWoEAhmTU', label: 'St. George St, St. Augustine', city: 'St. Augustine, FL', region: 'Southeast', type: 'city' },
  { id: 'cmkAbDUEoyA', label: 'Hollywood Beach Broadwalk', city: 'Hollywood, FL', region: 'Southeast', type: 'beach' },
  { id: 'YWs0HMRVCBY', label: 'Fort Lauderdale Beach Bar', city: 'Fort Lauderdale, FL', region: 'Southeast', type: 'beach' },
  { id: 'DxZziUUr6CY', label: 'Port Miami + Marine Radio', city: 'Miami, FL', region: 'Southeast', type: 'harbor' },

  // --- MIDWEST ---
  { id: '67BCsiW-1Io', label: 'Midway Airport 4K', city: 'Chicago, IL', region: 'Midwest', type: 'airport' },

  // --- WEST ---
  { id: 'EO_1LWqsCNE', label: 'Venice Beach Live', city: 'Los Angeles, CA', region: 'West', type: 'beach' },
  { id: 'KCcNxl2ZppI', label: 'Fremont Street Downtown', city: 'Las Vegas, NV', region: 'West', type: 'city' },
  { id: 'CXYr04BWvmc', label: 'Bay Bridge Live', city: 'San Francisco, CA', region: 'West', type: 'traffic' },

  // --- WEATHER / NEWS ---
  { id: 'wt6SIE7BXS8', label: 'FOX Weather Live 24/7', city: 'National', region: 'Weather', type: 'news' },

  // --- MULTI / WORLD ---
  { id: 'Jgp4JDG-nsk', label: 'USA Cities Tour (Vegas, NYC, Miami)', city: 'Multi-City', region: 'Multi', type: 'city' },
  { id: 'EFum1rGUdkk', label: 'Top 1200 Webcams Worldwide', city: 'Global', region: 'Multi', type: 'city' },
  { id: 'HfgIFGbdGJ0', label: 'The World Live (earthTV)', city: 'Global', region: 'Multi', type: 'city' },
];

const REGIONS = ['All', ...new Set(CAMERAS.map(c => c.region))];

const TYPE_ICONS = {
  rail: Train,
  traffic: Camera,
  harbor: Waves,
  news: Radio,
};

function TypeBadge({ type }) {
  if (!type || type === 'city' || type === 'beach') return null;
  const Icon = TYPE_ICONS[type] || Camera;
  return (
    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-700/50 text-slate-400">
      <Icon size={10} />
      {type}
    </span>
  );
}

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
          <h3 className="text-lg font-semibold text-slate-200">Live Cameras</h3>
          <p className="text-sm text-slate-500">
            {CAMERAS.length} live feeds -- city cams, traffic, rail, harbors, news
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
            {r !== 'All' && (
              <span className="ml-1 text-[10px] opacity-60">
                ({CAMERAS.filter(c => c.region === r).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Camera grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(cam => (
          <div key={cam.id} className="glass-panel overflow-hidden group">
            <div className="relative" style={{ height: 220 }}>
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
              <MapPin size={11} className="text-purple-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300 truncate">{cam.label}</span>
              <TypeBadge type={cam.type} />
              <span className="text-[10px] text-slate-500 ml-auto shrink-0">{cam.city}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Live feeds via YouTube -- streams maintained by third-party broadcasters
      </p>
    </div>
  );
}
