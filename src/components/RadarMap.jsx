import { useState } from 'react';
import { Droplets, Wind, Thermometer, Cloud, Satellite, Navigation } from 'lucide-react';

const LAYERS = [
  { id: 'rainAccu', label: 'Rain', icon: Droplets },
  { id: 'wind', label: 'Wind', icon: Wind },
  { id: 'temp', label: 'Temp', icon: Thermometer },
  { id: 'clouds', label: 'Clouds', icon: Cloud },
  { id: 'satellite', label: 'Satellite', icon: Satellite },
];

function buildWindyUrl(lat, lon, zoom, overlay) {
  return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0F&metricWind=mph&zoom=${zoom}&overlay=${overlay}&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&message=true`;
}

export default function RadarMap({ location }) {
  const lat = location?.latitude || 39.8;
  const lon = location?.longitude || -98.5;
  const [layer, setLayer] = useState('rainAccu');
  const [iframeKey, setIframeKey] = useState(0);

  const switchLayer = (id) => {
    setLayer(id);
    setIframeKey(k => k + 1);
  };

  return (
    <div className="animate-slide-up">
      {/* Layer selector */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {LAYERS.map(l => (
          <button
            key={l.id}
            onClick={() => switchLayer(l.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${layer === l.id
                ? 'bg-red-500/25 text-red-300 border border-red-500/50 shadow-lg shadow-red-500/10'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200 hover:bg-neutral-700/50'}`}
          >
            <l.icon size={13} />
            {l.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-neutral-700/50"
        style={{ height: 'calc(100vh - 210px)', minHeight: 450 }}>
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
    </div>
  );
}
