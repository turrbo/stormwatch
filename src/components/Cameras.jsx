import { useState, useEffect, useRef } from 'react';
import { Camera, Maximize2, Minimize2, MapPin, Train, Radio, Waves, Video, RefreshCw } from 'lucide-react';
import { DOT_SOURCES } from '../services/dotCameras';

// ── YouTube Live streams ──────────────────────────────────────────────
const YT_CAMERAS = [
  // Northeast
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
  // Mid-Atlantic / DC
  { id: 'Mm-yAD8E3SU', label: 'Union Station DC Railcam', city: 'Washington, DC', region: 'Mid-Atlantic', type: 'rail' },
  { id: 'wgkdREYOfw0', label: 'Ashland Rail Cam (PTZ)', city: 'Ashland, VA', region: 'Mid-Atlantic', type: 'rail' },
  // Southeast
  { id: 'ZksWoEAhmTU', label: 'St. George St, St. Augustine', city: 'St. Augustine, FL', region: 'Southeast', type: 'city' },
  { id: 'cmkAbDUEoyA', label: 'Hollywood Beach Broadwalk', city: 'Hollywood, FL', region: 'Southeast', type: 'beach' },
  { id: 'YWs0HMRVCBY', label: 'Fort Lauderdale Beach Bar', city: 'Fort Lauderdale, FL', region: 'Southeast', type: 'beach' },
  { id: 'DxZziUUr6CY', label: 'Port Miami + Marine Radio', city: 'Miami, FL', region: 'Southeast', type: 'harbor' },
  // Midwest
  { id: '67BCsiW-1Io', label: 'Midway Airport 4K', city: 'Chicago, IL', region: 'Midwest', type: 'airport' },
  // West
  { id: 'EO_1LWqsCNE', label: 'Venice Beach Live', city: 'Los Angeles, CA', region: 'West', type: 'beach' },
  { id: 'KCcNxl2ZppI', label: 'Fremont Street Downtown', city: 'Las Vegas, NV', region: 'West', type: 'city' },
  { id: 'CXYr04BWvmc', label: 'Bay Bridge Live', city: 'San Francisco, CA', region: 'West', type: 'traffic' },
  // Weather
  { id: 'wt6SIE7BXS8', label: 'FOX Weather Live 24/7', city: 'National', region: 'Weather', type: 'news' },
  // Multi
  { id: 'Jgp4JDG-nsk', label: 'USA Cities Tour', city: 'Multi-City', region: 'Multi', type: 'city' },
  { id: 'EFum1rGUdkk', label: 'Top 1200 Webcams Worldwide', city: 'Global', region: 'Multi', type: 'city' },
  { id: 'HfgIFGbdGJ0', label: 'The World Live (earthTV)', city: 'Global', region: 'Multi', type: 'city' },
];

const YT_REGIONS = ['All', ...new Set(YT_CAMERAS.map(c => c.region))];
const TYPE_ICONS = { rail: Train, traffic: Camera, harbor: Waves, news: Radio };
const TABS = ['Live Streams', 'DOT Traffic Cams'];
const DOT_KEYS = Object.keys(DOT_SOURCES);

const totalDotCams = DOT_KEYS.reduce((sum, k) => sum + DOT_SOURCES[k].cameras.length, 0);

function TypeBadge({ type }) {
  if (!type || type === 'city' || type === 'beach' || type === 'weather' || type === 'airport') return null;
  const Icon = TYPE_ICONS[type] || Camera;
  return (
    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-neutral-700/50 text-neutral-400">
      <Icon size={10} /> {type}
    </span>
  );
}

function DotCamImage({ src, label }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 8000);
    return () => clearInterval(iv);
  }, []);

  return (
    <img
      src={`${src}${src.includes('?') ? '&' : '?'}t=${tick}`}
      alt={label}
      className="w-full h-full object-cover bg-neutral-900"
      loading="lazy"
      onError={(e) => { e.target.style.opacity = '0.3'; }}
    />
  );
}

export default function Cameras() {
  const [tab, setTab] = useState('Live Streams');
  const [expanded, setExpanded] = useState(null);
  const [expandedType, setExpandedType] = useState(null);
  const [ytRegion, setYtRegion] = useState('All');
  const [dotFilter, setDotFilter] = useState('All');

  const ytFiltered = ytRegion === 'All' ? YT_CAMERAS : YT_CAMERAS.filter(c => c.region === ytRegion);

  const allDotCams = DOT_KEYS.flatMap(k =>
    DOT_SOURCES[k].cameras.map(c => ({ ...c, sourceKey: k, sourceLabel: DOT_SOURCES[k].label }))
  );
  const dotFiltered = dotFilter === 'All'
    ? allDotCams
    : allDotCams.filter(c => c.sourceKey === dotFilter);

  // ── Expanded view ──
  if (expanded) {
    const isYt = expandedType === 'yt';
    const cam = isYt
      ? YT_CAMERAS.find(c => c.id === expanded)
      : allDotCams.find(c => c.id === expanded);

    return (
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-purple-400" />
            <span className="text-sm font-medium text-neutral-200">{cam?.label}</span>
            <span className="text-xs text-neutral-500">
              {isYt ? cam?.city : cam?.sourceLabel}
            </span>
          </div>
          <button
            onClick={() => { setExpanded(null); setExpandedType(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50 transition-all"
          >
            <Minimize2 size={13} /> Back to Grid
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-neutral-700/50"
          style={{ height: 'calc(100vh - 210px)', minHeight: 450 }}>
          {isYt ? (
            <iframe
              src={`https://www.youtube.com/embed/${expanded}?autoplay=1&mute=1&rel=0`}
              className="w-full h-full border-0"
              title={cam?.label || 'Live Camera'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <DotCamImage src={cam?.imageUrl || ''} label={cam?.label || 'DOT Camera'} />
          )}
        </div>
        {!isYt && (
          <p className="text-[11px] text-neutral-500 mt-2 text-center flex items-center justify-center gap-1">
            <RefreshCw size={10} /> Image refreshes every 8 seconds
          </p>
        )}
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
          <h3 className="text-lg font-semibold text-neutral-200">Live Cameras</h3>
          <p className="text-sm text-neutral-500">
            {YT_CAMERAS.length} live streams + {totalDotCams} DOT cams across {DOT_KEYS.length} states
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-2 border-b border-neutral-700/50 pb-2">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === t
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/5'
                : 'bg-neutral-800/40 text-neutral-400 border border-neutral-700/30 hover:text-neutral-200 hover:bg-neutral-700/40'}`}
          >
            {t === 'Live Streams' ? <Video size={14} /> : <Camera size={14} />}
            {t}
          </button>
        ))}
      </div>

      {/* ── YOUTUBE TAB ── */}
      {tab === 'Live Streams' && (
        <>
          <div className="flex items-center gap-1.5 flex-wrap">
            {YT_REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setYtRegion(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${ytRegion === r
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50'}`}
              >
                {r}
                {r !== 'All' && (
                  <span className="ml-1 text-[10px] opacity-60">
                    ({YT_CAMERAS.filter(c => c.region === r).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ytFiltered.map(cam => (
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
                    onClick={() => { setExpanded(cam.id); setExpandedType('yt'); }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/80
                      opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    title="Expand"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
                <div className="px-3 py-2 flex items-center gap-2">
                  <MapPin size={11} className="text-purple-400 shrink-0" />
                  <span className="text-xs font-medium text-neutral-300 truncate">{cam.label}</span>
                  <TypeBadge type={cam.type} />
                  <span className="text-[10px] text-neutral-500 ml-auto shrink-0">{cam.city}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-600 text-center">
            Live feeds via YouTube -- streams maintained by third-party broadcasters
          </p>
        </>
      )}

      {/* ── DOT TRAFFIC CAMS TAB ── */}
      {tab === 'DOT Traffic Cams' && (
        <>
          {/* State filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setDotFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${dotFilter === 'All'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50'}`}
            >
              All States
            </button>
            {DOT_KEYS.map(k => (
              <button
                key={k}
                onClick={() => setDotFilter(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${dotFilter === k
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50'}`}
              >
                {DOT_SOURCES[k].label}
                <span className="ml-1 text-[10px] opacity-60">({DOT_SOURCES[k].cameras.length})</span>
              </button>
            ))}
          </div>

          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
            <RefreshCw size={14} className="text-red-400 shrink-0" />
            <span className="text-xs text-red-300">
              {totalDotCams} DOT cameras across {DOT_KEYS.length} states. Auto-refresh every 8s. Some state DOT APIs are restricted.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {dotFiltered.map((cam, idx) => (
              <div
                key={cam.id}
                className="glass-panel overflow-hidden group cursor-pointer hover:border-red-500/30 transition-all"
                onClick={() => { setExpanded(cam.id); setExpandedType('dot'); }}
              >
                <div className="relative bg-neutral-900" style={{ height: 170 }}>
                  <DotCamImage src={cam.imageUrl} label={cam.label} />
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/80
                      opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    title="Expand"
                  >
                    <Maximize2 size={14} />
                  </button>
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/60 text-red-300">
                    {cam.sourceLabel}
                  </span>
                </div>
                <div className="px-3 py-2 flex items-center gap-2">
                  <MapPin size={11} className="text-red-400 shrink-0" />
                  <span className="text-xs font-medium text-neutral-300 truncate">{cam.label}</span>
                  {cam.area && (
                    <span className="text-[10px] text-neutral-500 ml-auto shrink-0">{cam.area}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-600 text-center">
            Feeds from state DOT traffic monitoring systems -- public camera data
          </p>
        </>
      )}
    </div>
  );
}
