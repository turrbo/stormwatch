import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { getRadarFrames, getRadarTileUrl, getSatelliteTileUrl } from '../services/radarService';
import { Play, Pause, SkipBack, SkipForward, Layers, Cloud, Droplets, Thermometer } from 'lucide-react';

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function RadarLayer({ url }) {
  if (!url) return null;
  return <TileLayer url={url} opacity={0.6} className="radar-tiles" />;
}

export default function RadarMap({ location }) {
  const [frames, setFrames] = useState(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [layer, setLayer] = useState('radar');
  const intervalRef = useRef(null);

  useEffect(() => {
    getRadarFrames().then(f => {
      setFrames(f);
      setFrameIdx(f.radar.length - 1);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!playing || !frames) return;
    const list = layer === 'radar' ? frames.radar : frames.satellite;
    intervalRef.current = setInterval(() => {
      setFrameIdx(i => (i + 1) % list.length);
    }, 600);
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
    : '';

  const center = location ? [location.latitude, location.longitude] : [39.8, -98.5];

  return (
    <div className="glass-panel overflow-hidden animate-slide-up">
      <div className="relative" style={{ height: 'calc(100vh - 200px)', minHeight: 400 }}>
        <MapContainer center={center} zoom={7} className="h-full w-full"
          zoomControl={true} attributionControl={true}>
          <MapUpdater center={center} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            className="base-tiles"
          />
          <RadarLayer url={tileUrl} />
        </MapContainer>

        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1">
          {[
            { id: 'radar', icon: Droplets, label: 'Precipitation' },
            { id: 'satellite', icon: Cloud, label: 'Satellite' },
          ].map(l => (
            <button key={l.id} onClick={() => { setLayer(l.id); setFrameIdx(0); setPlaying(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${layer === l.id ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' : 'glass-panel-light text-slate-400 hover:text-slate-200'}`}>
              <l.icon size={14} />
              {l.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-[1000]">
          <div className="glass-panel p-3 flex items-center gap-3">
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
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full" />
            </div>

            <span className="text-xs text-slate-400 font-mono min-w-[56px] text-right">{frameTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
