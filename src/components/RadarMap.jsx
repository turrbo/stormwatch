import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Droplets, Wind, Thermometer, Cloud, Satellite, Zap, Radio, Clock } from 'lucide-react';
import { connectLightningWS, getLightningTileUrl } from '../services/lightningApi';

const RADAR_LAYERS = [
  { id: 'rainAccu', label: 'Rain', icon: Droplets },
  { id: 'wind', label: 'Wind', icon: Wind },
  { id: 'temp', label: 'Temp', icon: Thermometer },
  { id: 'clouds', label: 'Clouds', icon: Cloud },
  { id: 'satellite', label: 'Satellite', icon: Satellite },
];

function buildWindyUrl(lat, lon, zoom, overlay) {
  return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0F&metricWind=mph&zoom=${zoom}&overlay=${overlay}&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&message=true`;
}

/* ── Lightning sub-components ── */

function LightningTileLayer() {
  const tileUrl = getLightningTileUrl(5);
  return <TileLayer url={tileUrl} opacity={0.7} attribution="Blitzortung.org" />;
}

function StrikeMarkers({ strikes }) {
  return strikes.map((s, i) => {
    const age = (Date.now() - (s.time || Date.now())) / 1000;
    const opacity = Math.max(0.2, 1 - age / 300);
    return (
      <CircleMarker
        key={`${s.lat}-${s.lon}-${i}`}
        center={[s.lat, s.lon]}
        radius={3}
        pathOptions={{ color: '#fbbf24', fillColor: '#fbbf24', fillOpacity: opacity, weight: 1, opacity }}
      >
        <Popup>
          <div className="text-xs">
            <div className="font-bold">Lightning Strike</div>
            <div>{s.lat.toFixed(3)}, {s.lon.toFixed(3)}</div>
            {s.delay && <div>Detection delay: {s.delay}ms</div>}
          </div>
        </Popup>
      </CircleMarker>
    );
  });
}

function MapRecenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lon], map.getZoom()); }, [lat, lon, map]);
  return null;
}

function LightningPanel({ lat, lon }) {
  const [strikes, setStrikes] = useState([]);
  const [connected, setConnected] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [mode, setMode] = useState('live');

  const addStrike = useCallback((strike) => {
    setStrikes(prev => {
      const next = [...prev, strike];
      return next.length > 500 ? next.slice(-500) : next;
    });
    setStrikeCount(c => c + 1);
  }, []);

  useEffect(() => {
    if (mode !== 'live') return;
    const ws = connectLightningWS(addStrike, () => setConnected(false));
    if (ws) setConnected(true);
    return () => { ws?.close(); setConnected(false); };
  }, [mode, addStrike]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button onClick={() => setMode('live')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${mode === 'live'
                ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            <Radio size={13} /> Live Strikes
          </button>
          <button onClick={() => setMode('heatmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${mode === 'heatmap'
                ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            <Clock size={13} /> 1h Heatmap
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-xs text-neutral-500">{connected ? 'Live' : 'Disconnected'}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-xs font-medium text-yellow-300">{strikeCount} strikes</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-neutral-700/50"
        style={{ height: 'calc(100vh - 260px)', minHeight: 450 }}>
        <MapContainer center={[lat, lon]} zoom={5} className="w-full h-full" zoomControl={true}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO" />
          {mode === 'heatmap' && <LightningTileLayer />}
          {mode === 'live' && <StrikeMarkers strikes={strikes} />}
          <MapRecenter lat={lat} lon={lon} />
        </MapContainer>
      </div>
      <p className="text-[11px] text-neutral-600 text-center">
        Lightning data from Blitzortung.org community network
      </p>
    </div>
  );
}

/* ── Main component ── */

const VIEW_TABS = [
  { id: 'radar', label: 'Radar', icon: Droplets },
  { id: 'lightning', label: 'Lightning', icon: Zap },
];

export default function RadarMap({ location }) {
  const lat = location?.latitude || 39.8;
  const lon = location?.longitude || -98.5;
  const [view, setView] = useState('radar');
  const [layer, setLayer] = useState('rainAccu');
  const [iframeKey, setIframeKey] = useState(0);

  const switchLayer = (id) => {
    setLayer(id);
    setIframeKey(k => k + 1);
  };

  return (
    <div className="animate-slide-up">
      {/* Radar / Lightning toggle */}
      <div className="flex items-center gap-1.5 mb-3">
        {VIEW_TABS.map(t => (
          <button key={t.id} onClick={() => setView(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${view === t.id
                ? 'bg-red-500/25 text-red-300 border border-red-500/50 shadow-lg shadow-red-500/10'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50'}`}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {view === 'radar' && (
        <>
          {/* Layer selector */}
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            {RADAR_LAYERS.map(l => (
              <button key={l.id} onClick={() => switchLayer(l.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${layer === l.id
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50'}`}>
                <l.icon size={13} /> {l.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-neutral-700/50"
            style={{ height: 'calc(100vh - 260px)', minHeight: 450 }}>
            <iframe
              key={iframeKey}
              src={buildWindyUrl(lat, lon, 7, layer)}
              className="w-full h-full border-0"
              title="Weather Radar Map"
              allow="fullscreen"
              allowFullScreen
            />
          </div>
          <p className="text-[11px] text-neutral-600 mt-2 text-center">
            Interactive radar powered by Windy.com -- zoom, pan, and click for details
          </p>
        </>
      )}

      {view === 'lightning' && <LightningPanel lat={lat} lon={lon} />}
    </div>
  );
}
