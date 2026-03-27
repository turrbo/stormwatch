import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Zap, Radio, Clock } from 'lucide-react';
import { connectLightningWS, getLightningTileUrl } from '../services/lightningApi';

function LightningTileLayer() {
  const tileUrl = getLightningTileUrl(5);
  return (
    <TileLayer
      url={tileUrl}
      opacity={0.7}
      attribution="Blitzortung.org"
    />
  );
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
        pathOptions={{
          color: '#fbbf24',
          fillColor: '#fbbf24',
          fillOpacity: opacity,
          weight: 1,
          opacity,
        }}
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

export default function LightningMap({ location }) {
  const lat = location?.latitude || 39.8;
  const lon = location?.longitude || -98.5;
  const [strikes, setStrikes] = useState([]);
  const [connected, setConnected] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [mode, setMode] = useState('live'); // live or heatmap
  const wsRef = useRef(null);

  const addStrike = useCallback((strike) => {
    setStrikes(prev => {
      const next = [...prev, strike];
      return next.length > 500 ? next.slice(-500) : next;
    });
    setStrikeCount(c => c + 1);
  }, []);

  useEffect(() => {
    if (mode !== 'live') return;

    const ws = connectLightningWS(
      addStrike,
      () => setConnected(false)
    );

    if (ws) {
      setConnected(true);
    }

    return () => {
      ws?.close();
      setConnected(false);
    };
  }, [mode, addStrike]);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <Zap size={20} className="text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Lightning Map</h3>
            <p className="text-sm text-slate-500">
              Real-time global lightning detection via Blitzortung network
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Connection status */}
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-xs text-slate-500">
              {connected ? 'Live' : 'Disconnected'}
            </span>
          </div>

          {/* Strike counter */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-xs font-medium text-yellow-300">{strikeCount} strikes</span>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center gap-1.5">
        <button onClick={() => setMode('live')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
            ${mode === 'live'
              ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50'
              : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
          <Radio size={13} /> Live Strikes
        </button>
        <button onClick={() => setMode('heatmap')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
            ${mode === 'heatmap'
              ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50'
              : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
          <Clock size={13} /> 1h Heatmap
        </button>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-700/50"
        style={{ height: 'calc(100vh - 280px)', minHeight: 450 }}>
        <MapContainer
          center={[lat, lon]}
          zoom={5}
          className="w-full h-full"
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
          />
          {mode === 'heatmap' && <LightningTileLayer />}
          {mode === 'live' && <StrikeMarkers strikes={strikes} />}
          <MapRecenter lat={lat} lon={lon} />
        </MapContainer>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Lightning data from Blitzortung.org community network -- non-commercial use only
      </p>
    </div>
  );
}
