import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { getRadarFrames, getRadarTileUrl, getSatelliteTileUrl } from '../services/radarService';
import { Play, Pause, SkipBack, SkipForward, Droplets, Cloud } from 'lucide-react';

function MapController({ center }) {
  const map = useMap();
  const initialized = useRef(false);

  useEffect(() => {
    if (center && !initialized.current) {
      map.setView(center, 7);
      initialized.current = true;
    }
  }, [center, map]);

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 250);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

export default function RadarMap({ location }) {
  const [frames, setFrames] = useState(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [layer, setLayer] = useState('radar');
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    getRadarFrames()
      .then(f => {
        setFrames(f);
        setFrameIdx(Math.max(0, (f.radar || []).length - 1));
      })
      .catch(() => setError('Could not load radar data'));
  }, []);

  useEffect(() => {
    if (!playing || !frames) return;
    const list = layer === 'radar' ? frames.radar : frames.satellite;
    if (!list.length) return;
    intervalRef.current = setInterval(() => {
      setFrameIdx(i => (i + 1) % list.length);
    }, 700);
    return () => clearInterval(intervalRef.current);
  }, [playing, frames, layer]);

  const list = frames ? (layer === 'radar' ? frames.radar : frames.satellite) : [];
  const currentFrame = list[frameIdx];
  const tileUrl = currentFrame
    ? (layer === 'radar'
        ? getRadarTileUrl(frames.host, currentFrame.path)
        : getSatelliteTileUrl(frames.host, currentFrame.path))
    : null;

  const frameTime = currentFrame
    ? new Date(currentFrame.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  const center = location ? [location.latitude, location.longitude] : [39.8, -98.5];

  return (
    <div className="animate-slide-up">
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/50"
        style={{ height: 'calc(100vh - 180px)', minHeight: 450 }}>

        <MapContainer
          center={center}
          zoom={7}
          style={{ height: '100%', width: '100%', background: '#1a1a2e' }}
          zoomControl={true}
          attributionControl={true}
        >
          <MapController center={center} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            maxZoom={19}
            zIndex={1}
          />
          {tileUrl && (
            <TileLayer key={tileUrl} url={tileUrl} opacity={0.7} zIndex={10} />
          )}
        </MapContainer>

        {/* Layer toggle */}
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5">
          {[
            { id: 'radar', icon: Droplets, label: 'Precipitation' },
            { id: 'satellite', icon: Cloud, label: 'Satellite' },
          ].map(l => (
            <button
              key={l.id}
              onClick={() => {
                setLayer(l.id);
                setPlaying(false);
                if (frames) {
                  const newList = l.id === 'radar' ? frames.radar : frames.satellite;
                  setFrameIdx(Math.max(0, newList.length - 1));
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all backdrop-blur-md
                ${layer === l.id
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/70 text-slate-400 border border-slate-700/50 hover:text-slate-200 hover:bg-slate-800/70'}`}
            >
              <l.icon size={14} />
              {l.label}
            </button>
          ))}
        </div>

        {/* Radar legend */}
        {layer === 'radar' && (
          <div className="absolute top-3 left-12 z-[1000] backdrop-blur-md bg-slate-900/70 border border-slate-700/50 rounded-lg p-2.5">
            <p className="text-[10px] text-slate-400 mb-1.5 font-medium">Intensity</p>
            <div className="flex items-center gap-0.5">
              {['#78e639','#1eb100','#00890e','#fef734','#ffb930','#fd6234','#fc1f2e','#cc0bbe'].map((c, i) => (
                <div key={i} className="w-3 h-2 rounded-[2px]" style={{ background: c, opacity: 0.85 }} />
              ))}
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[9px] text-slate-500">Light</span>
              <span className="text-[9px] text-slate-500">Heavy</span>
            </div>
          </div>
        )}

        {/* Playback controls */}
        <div className="absolute bottom-3 left-3 right-3 z-[1000]">
          <div className="backdrop-blur-md bg-slate-900/80 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
            <button onClick={() => setFrameIdx(i => Math.max(0, i - 1))}
              className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
              <SkipBack size={16} />
            </button>
            <button onClick={() => setPlaying(!playing)}
              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={() => setFrameIdx(i => Math.min(list.length - 1, i + 1))}
              className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
              <SkipForward size={16} />
            </button>

            <div className="flex-1 mx-2">
              <input type="range" min={0} max={Math.max(0, list.length - 1)} value={frameIdx}
                onChange={e => { setFrameIdx(Number(e.target.value)); setPlaying(false); }}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                  [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg" />
            </div>

            <span className="text-xs text-slate-300 font-mono min-w-[56px] text-right">{frameTime}</span>
          </div>
        </div>

        {error && (
          <div className="absolute inset-0 z-[999] flex items-center justify-center bg-slate-900/80 rounded-2xl">
            <p className="text-sm text-slate-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
