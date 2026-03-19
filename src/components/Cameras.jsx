import { useState } from 'react';
import { Camera, MapPin, Navigation, Eye } from 'lucide-react';

const QUICK_LOCATIONS = [
  { label: 'New York', lat: 40.71, lon: -74.01, zoom: 9 },
  { label: 'Los Angeles', lat: 34.05, lon: -118.24, zoom: 9 },
  { label: 'Chicago', lat: 41.88, lon: -87.63, zoom: 9 },
  { label: 'Miami', lat: 25.76, lon: -80.19, zoom: 9 },
  { label: 'San Francisco', lat: 37.77, lon: -122.42, zoom: 10 },
  { label: 'Seattle', lat: 47.61, lon: -122.33, zoom: 9 },
  { label: 'Denver', lat: 39.74, lon: -104.99, zoom: 9 },
  { label: 'Atlanta', lat: 33.75, lon: -84.39, zoom: 9 },
  { label: 'Dallas', lat: 32.78, lon: -96.80, zoom: 9 },
  { label: 'Boston', lat: 42.36, lon: -71.06, zoom: 10 },
  { label: 'Phoenix', lat: 33.45, lon: -112.07, zoom: 9 },
  { label: 'Las Vegas', lat: 36.17, lon: -115.14, zoom: 10 },
  { label: 'DC', lat: 38.91, lon: -77.04, zoom: 10 },
  { label: 'Nashville', lat: 36.16, lon: -86.78, zoom: 10 },
  { label: 'Minneapolis', lat: 44.98, lon: -93.27, zoom: 9 },
  { label: 'US Overview', lat: 39.8, lon: -98.5, zoom: 4 },
];

function buildWindyUrl(lat, lon, zoom, overlay) {
  return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=%C2%B0F&metricWind=mph&zoom=${zoom}&overlay=${overlay}&product=ecmwf&level=surface&lat=${lat}&lon=${lon}`;
}

export default function Cameras({ location }) {
  const defaultLat = location?.latitude || 39.8;
  const defaultLon = location?.longitude || -98.5;
  const [mapView, setMapView] = useState({ lat: defaultLat, lon: defaultLon, zoom: 7 });
  const [overlay, setOverlay] = useState('webcams');
  const [iframeKey, setIframeKey] = useState(0);

  const jumpTo = (loc) => {
    setMapView({ lat: loc.lat, lon: loc.lon, zoom: loc.zoom });
    setIframeKey(k => k + 1);
  };

  const resetToMyLocation = () => {
    setMapView({ lat: defaultLat, lon: defaultLon, zoom: 7 });
    setIframeKey(k => k + 1);
  };

  const toggleOverlay = (ov) => {
    setOverlay(ov);
    setIframeKey(k => k + 1);
  };

  const embedUrl = buildWindyUrl(mapView.lat, mapView.lon, mapView.zoom, overlay);

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
            Click camera icons on the map to view live feeds
          </p>
        </div>
      </div>

      {/* Overlay toggle */}
      <div className="flex items-center gap-2">
        {[
          { id: 'webcams', label: 'Webcams', icon: Camera },
          { id: 'radar', label: 'Radar', icon: Eye },
        ].map(ov => (
          <button
            key={ov.id}
            onClick={() => toggleOverlay(ov.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${overlay === ov.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'glass-panel-light text-slate-400 hover:text-slate-200'}`}
          >
            <ov.icon size={13} />
            {ov.label}
          </button>
        ))}
        <button
          onClick={resetToMyLocation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
            glass-panel-light text-slate-400 hover:text-slate-200 transition-all ml-auto"
        >
          <Navigation size={13} />
          My Location
        </button>
      </div>

      {/* Main map */}
      <div className="rounded-2xl overflow-hidden border border-slate-700/50"
        style={{ height: 'calc(100vh - 310px)', minHeight: 450 }}>
        <iframe
          key={iframeKey}
          src={embedUrl}
          className="w-full h-full border-0"
          title="Live Weather Cameras Map"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
        />
      </div>

      {/* Quick locations */}
      <div className="glass-panel p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={14} className="text-blue-400" />
          <h4 className="text-sm font-medium text-slate-300">Jump to Location</h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_LOCATIONS.map(loc => (
            <button
              key={loc.label}
              onClick={() => jumpTo(loc)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all
                ${mapView.lat === loc.lat && mapView.lon === loc.lon
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Camera data powered by Windy.com webcam network
      </p>
    </div>
  );
}
