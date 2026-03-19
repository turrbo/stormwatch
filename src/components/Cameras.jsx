import { useState, useEffect } from 'react';
import { Camera, ExternalLink, MapPin, RefreshCw, Video } from 'lucide-react';

const DOT_CAMERA_LINKS = {
  'New York': 'https://511ny.org/map#702702',
  'California': 'https://cwwp2.dot.ca.gov/vm/iframemap.htm',
  'Texas': 'https://its.txdot.gov/its/District/HOU/Camera',
  'Florida': 'https://fl511.com/map',
  'Illinois': 'https://www.travelmidwest.com/lmiga/cameraMap.jsp',
  'Pennsylvania': 'https://www.511pa.com/map',
  'Ohio': 'https://www.ohgo.com/cameras',
  'Georgia': 'https://511ga.org/map',
  'North Carolina': 'https://tims.ncdot.gov/tims/camera/',
  'Michigan': 'https://mdotjboss.state.mi.us/MiDrive/map',
  'Virginia': 'https://www.511virginia.org/map',
  'Washington': 'https://wsdot.com/travel/real-time/cameras',
  'Colorado': 'https://www.cotrip.org/speed-map',
  'Arizona': 'https://az511.com/map',
  'Tennessee': 'https://smartway.tn.gov/traffic',
  'Missouri': 'https://traveler.modot.org/map/',
  'Indiana': 'https://511in.org/map',
  'Minnesota': 'https://511mn.org/map',
  'Wisconsin': 'https://511wi.gov/map',
  'Oregon': 'https://tripcheck.com/Pages/Road-Conditions-Background.aspx',
};

export default function Cameras({ location }) {
  const [loading, setLoading] = useState(false);

  const stateName = location?.admin1 || '';
  const dotLink = DOT_CAMERA_LINKS[stateName];

  const windyUrl = location
    ? `https://www.windy.com/webcams/map?${location.latitude},${location.longitude},8`
    : 'https://www.windy.com/webcams';

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Camera size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Live Weather Cameras</h3>
            <p className="text-sm text-slate-500">View real-time conditions from nearby cameras</p>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-700/50 mb-4"
          style={{ height: 'calc(100vh - 380px)', minHeight: 400 }}>
          <iframe
            src={`https://www.windy.com/webcams/map?${location?.latitude || 39.8},${location?.longitude || -98.5},8`}
            className="w-full h-full border-0"
            title="Weather Cameras Map"
            loading="lazy"
            allow="geolocation"
            style={{ filter: 'brightness(0.9)' }}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Powered by Windy.com webcam network
          </p>
          <a href={windyUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Open full map <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {dotLink && (
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <Video size={18} className="text-green-400" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-300">{stateName} DOT Traffic Cameras</h4>
              <p className="text-xs text-slate-500">State highway and traffic camera network</p>
            </div>
            <a href={dotLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400
                text-xs font-medium hover:bg-green-500/20 transition-colors">
              View Cameras <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      <div className="glass-panel p-4">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Additional Camera Resources</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { name: 'NOAA Weather Cams', url: 'https://www.weather.gov/webcams' },
            { name: 'FAA Airport Cameras', url: 'https://avcams.faa.gov/' },
            { name: 'NPS Park Webcams', url: 'https://www.nps.gov/subjects/air/webcams.htm' },
            { name: 'WeatherBug Cameras', url: 'https://www.weatherbug.com/cameras/' },
          ].map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel-light
                hover:bg-slate-700/50 text-sm text-slate-400 hover:text-slate-200 transition-colors">
              <Camera size={14} className="shrink-0" />
              <span>{link.name}</span>
              <ExternalLink size={10} className="ml-auto shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
