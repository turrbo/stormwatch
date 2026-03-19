import { useState, useEffect, useRef } from 'react';
import { Camera, Maximize2, Minimize2, MapPin, Train, Radio, Waves, Video, RefreshCw } from 'lucide-react';

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
  // Weather / News
  { id: 'wt6SIE7BXS8', label: 'FOX Weather Live 24/7', city: 'National', region: 'Weather', type: 'news' },
  // Multi
  { id: 'Jgp4JDG-nsk', label: 'USA Cities Tour', city: 'Multi-City', region: 'Multi', type: 'city' },
  { id: 'EFum1rGUdkk', label: 'Top 1200 Webcams Worldwide', city: 'Global', region: 'Multi', type: 'city' },
  { id: 'HfgIFGbdGJ0', label: 'The World Live (earthTV)', city: 'Global', region: 'Multi', type: 'city' },
];

// ── NYC DOT Traffic Cameras (auto-refreshing stills) ──────────────────
const NYC_DOT_CAMERAS = [
  { id: '9565e94d-66f2-4965-9c13-82d5500d6cfd', label: 'Broadway @ 42 St', area: 'Midtown' },
  { id: 'bc2fd2da-1d56-46fa-a1ab-8674fac93877', label: '7 Ave @ 43 St (PTZ)', area: 'Midtown' },
  { id: '053e8995-f8cb-4d02-a659-70ac7c7da5db', label: 'Broadway @ 45 St', area: 'Midtown' },
  { id: 'c880d0c4-db84-44c2-9f00-62f21a83b5d0', label: 'Broadway @ Columbus Circle', area: 'Midtown' },
  { id: '8f692f55-8118-423b-8bcb-1ea49eaf442b', label: '2 Ave @ 42 St', area: 'Midtown' },
  { id: '25ad72fe-e74c-49af-b4c0-34c9eac14655', label: 'Holland Tunnel', area: 'Tunnel' },
  { id: 'bb9ce48d-0458-4493-89ad-ae51065b5796', label: 'Lincoln Tunnel Approach @ W 33 St', area: 'Tunnel' },
  { id: 'ecba28cb-ac70-4d25-abcb-6506111ea120', label: 'FDR Dr @ Brooklyn Bridge', area: 'Highway' },
  { id: 'c5040f93-f4ec-4803-8370-8b931b0443e2', label: 'FDR Dr @ 64 St', area: 'Highway' },
  { id: '155b2bff-5dd2-4109-bd10-e098376c8476', label: 'FDR Dr @ 96 St', area: 'Highway' },
  { id: '0267c1e2-6eaf-49d4-a063-df89e9242993', label: 'FDR Dr @ 79 St', area: 'Highway' },
  { id: '936d479d-402f-468a-b1c6-b2c2a68a0b4c', label: 'Harlem River Dr @ GWB Ramp', area: 'Highway' },
  { id: '60fbce69-38fa-42b2-9ae8-41aea66abddf', label: 'Brooklyn Bridge Entrance', area: 'Bridge' },
  { id: '8ea73365-6c7b-423a-87fc-4b6fc279dafa', label: 'BQE @ Sands St', area: 'Highway' },
  { id: '4f8c2e84-c15a-4474-91fb-7e14554d4c4e', label: 'Central Park West @ 65 St', area: 'Park' },
  { id: '8cc75cbc-e050-4947-aee8-639f63fe4ca7', label: 'Canal St @ Chrystie St', area: 'Downtown' },
  { id: '7cfc551d-403d-46a8-aa74-89f472b7136b', label: 'Broadway @ Battery Pl', area: 'Downtown' },
  { id: '86d418ab-10bc-4b73-a283-153abffabb0f', label: 'West St @ Battery Tunnel', area: 'Tunnel' },
  { id: '3576217a-82e8-4f2a-854f-3de97ef37362', label: 'BQE @ Pearl St', area: 'Highway' },
  { id: '9bd74b87-32d1-4767-8081-86a2e83f28f2', label: '12 Ave @ 42 St', area: 'Midtown' },
];

const DOT_IMG_BASE = 'https://webcams.nyctmc.org/api/cameras';

// ── Source tabs & region filters ──────────────────────────────────────
const SOURCES = ['Live Streams', 'NYC DOT Traffic'];

const YT_REGIONS = ['All', ...new Set(YT_CAMERAS.map(c => c.region))];
const DOT_AREAS = ['All', ...new Set(NYC_DOT_CAMERAS.map(c => c.area))];

const TYPE_ICONS = { rail: Train, traffic: Camera, harbor: Waves, news: Radio };

function TypeBadge({ type }) {
  if (!type || type === 'city' || type === 'beach' || type === 'weather' || type === 'airport') return null;
  const Icon = TYPE_ICONS[type] || Camera;
  return (
    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-700/50 text-slate-400">
      <Icon size={10} /> {type}
    </span>
  );
}

// Auto-refreshing DOT camera image component
function DotCamImage({ camId, label }) {
  const [tick, setTick] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <img
      src={`${DOT_IMG_BASE}/${camId}/image?t=${tick}`}
      alt={label}
      className="w-full h-full object-cover bg-slate-900"
      loading="lazy"
    />
  );
}

export default function Cameras() {
  const [source, setSource] = useState('Live Streams');
  const [expanded, setExpanded] = useState(null);
  const [expandedType, setExpandedType] = useState(null); // 'yt' or 'dot'
  const [ytRegion, setYtRegion] = useState('All');
  const [dotArea, setDotArea] = useState('All');

  const ytFiltered = ytRegion === 'All' ? YT_CAMERAS : YT_CAMERAS.filter(c => c.region === ytRegion);
  const dotFiltered = dotArea === 'All' ? NYC_DOT_CAMERAS : NYC_DOT_CAMERAS.filter(c => c.area === dotArea);

  // ── Expanded view ──
  if (expanded) {
    const isYt = expandedType === 'yt';
    const cam = isYt
      ? YT_CAMERAS.find(c => c.id === expanded)
      : NYC_DOT_CAMERAS.find(c => c.id === expanded);

    return (
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-purple-400" />
            <span className="text-sm font-medium text-slate-200">{cam?.label}</span>
            <span className="text-xs text-slate-500">{isYt ? cam?.city : `NYC - ${cam?.area}`}</span>
          </div>
          <button
            onClick={() => { setExpanded(null); setExpandedType(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 hover:bg-slate-700/50 transition-all"
          >
            <Minimize2 size={13} /> Back to Grid
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-700/50"
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
            <DotCamImage camId={expanded} label={cam?.label || 'DOT Camera'} />
          )}
        </div>
        {!isYt && (
          <p className="text-[11px] text-slate-500 mt-2 text-center flex items-center justify-center gap-1">
            <RefreshCw size={10} /> Image refreshes every 5 seconds -- NYC DOT
          </p>
        )}
      </div>
    );
  }

  // ── Main grid view ──
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
            {YT_CAMERAS.length} live streams + {NYC_DOT_CAMERAS.length} NYC DOT traffic cams
          </p>
        </div>
      </div>

      {/* Source tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/50 pb-2">
        {SOURCES.map(s => (
          <button
            key={s}
            onClick={() => setSource(s)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${source === s
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/5'
                : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-200 hover:bg-slate-700/40'}`}
          >
            {s === 'Live Streams' ? <Video size={14} /> : <Camera size={14} />}
            {s}
          </button>
        ))}
      </div>

      {/* ── YOUTUBE TAB ── */}
      {source === 'Live Streams' && (
        <>
          <div className="flex items-center gap-1.5 flex-wrap">
            {YT_REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setYtRegion(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${ytRegion === r
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 hover:bg-slate-700/50'}`}
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
        </>
      )}

      {/* ── NYC DOT TAB ── */}
      {source === 'NYC DOT Traffic' && (
        <>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DOT_AREAS.map(a => (
              <button
                key={a}
                onClick={() => setDotArea(a)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${dotArea === a
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 hover:bg-slate-700/50'}`}
              >
                {a}
                {a !== 'All' && (
                  <span className="ml-1 text-[10px] opacity-60">
                    ({NYC_DOT_CAMERAS.filter(c => c.area === a).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
            <RefreshCw size={14} className="text-blue-400 shrink-0" />
            <span className="text-xs text-blue-300">
              NYC DOT traffic camera images refresh automatically every 5 seconds. 943 cameras available -- showing curated selection of key intersections, highways, bridges, and tunnels.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {dotFiltered.map(cam => (
              <div
                key={cam.id}
                className="glass-panel overflow-hidden group cursor-pointer hover:border-blue-500/30 transition-all"
                onClick={() => { setExpanded(cam.id); setExpandedType('dot'); }}
              >
                <div className="relative bg-slate-900" style={{ height: 180 }}>
                  <DotCamImage camId={cam.id} label={cam.label} />
                  <button
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/80
                      opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    title="Expand"
                  >
                    <Maximize2 size={14} />
                  </button>
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/60 text-blue-300">
                    {cam.area}
                  </span>
                </div>
                <div className="px-3 py-2 flex items-center gap-2">
                  <MapPin size={11} className="text-blue-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-300 truncate">{cam.label}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-600 text-center">
            Camera feeds from NYC DOT (webcams.nyctmc.org) -- public traffic monitoring system
          </p>
        </>
      )}
    </div>
  );
}
