import { Wind, Sun, Droplets, Activity } from 'lucide-react';
import { getAQILevel, getUVLevel } from '../utils/formatters';

export default function AirQuality({ airQuality, weather }) {
  const aq = airQuality?.current;
  const uvMax = weather?.daily?.uv_index_max?.[0];

  if (!aq) {
    return (
      <div className="glass-panel p-8 text-center animate-slide-up">
        <Wind size={48} className="text-neutral-600 mx-auto mb-3" />
        <p className="text-sm text-neutral-500">Air quality data unavailable for this location.</p>
      </div>
    );
  }

  const aqiLevel = getAQILevel(aq.us_aqi);
  const uvLevel = uvMax != null ? getUVLevel(uvMax) : null;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="glass-panel glow-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: aqiLevel.bg }}>
            <span className="text-2xl font-bold" style={{ color: aqiLevel.color }}>{aq.us_aqi}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-200">Air Quality Index</h3>
            <p className="text-sm font-medium" style={{ color: aqiLevel.color }}>{aqiLevel.label}</p>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-neutral-800 mb-4 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(100, (aq.us_aqi / 300) * 100)}%`,
              background: `linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444, #a855f7)`,
            }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <PollutantCard label="PM2.5" value={aq.pm2_5?.toFixed(1)} unit="ug/m3"
            icon={Droplets} quality={getPollutantQuality(aq.pm2_5, 'pm25')} />
          <PollutantCard label="PM10" value={aq.pm10?.toFixed(1)} unit="ug/m3"
            icon={Droplets} quality={getPollutantQuality(aq.pm10, 'pm10')} />
          <PollutantCard label="Ozone" value={aq.ozone?.toFixed(0)} unit="ug/m3"
            icon={Activity} quality={getPollutantQuality(aq.ozone, 'ozone')} />
          <PollutantCard label="NO2" value={aq.nitrogen_dioxide?.toFixed(0)} unit="ug/m3"
            icon={Activity} />
          <PollutantCard label="SO2" value={aq.sulphur_dioxide?.toFixed(0)} unit="ug/m3"
            icon={Activity} />
          <PollutantCard label="CO" value={aq.carbon_monoxide?.toFixed(0)} unit="ug/m3"
            icon={Activity} />
        </div>
      </div>

      {uvLevel && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Sun size={28} style={{ color: uvLevel.color }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-200">UV Index</h3>
              <p className="text-sm font-medium" style={{ color: uvLevel.color }}>
                {uvMax.toFixed(1)} - {uvLevel.label}
              </p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (uvMax / 11) * 100)}%`,
                background: 'linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444, #a855f7)',
              }} />
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            {uvMax >= 8 ? 'Wear sunscreen, hat, and sunglasses. Avoid midday sun.' :
             uvMax >= 6 ? 'Wear sunscreen and protective clothing.' :
             uvMax >= 3 ? 'Moderate risk. Wear sunscreen.' :
             'Low risk. No special precautions needed.'}
          </p>
        </div>
      )}
    </div>
  );
}

function PollutantCard({ label, value, unit, icon: Icon, quality }) {
  return (
    <div className="glass-panel-light p-3">
      <div className="flex items-center gap-1.5 text-neutral-500 text-xs mb-1">
        {Icon && <Icon size={12} />}
        <span>{label}</span>
      </div>
      <div className="text-sm font-semibold text-neutral-200">
        {value ?? 'N/A'} <span className="text-xs text-neutral-500 font-normal">{unit}</span>
      </div>
    </div>
  );
}

function getPollutantQuality(value, type) {
  if (value == null) return null;
  const thresholds = {
    pm25: [12, 35.4, 55.4, 150.4],
    pm10: [54, 154, 254, 354],
    ozone: [54, 70, 85, 105],
  };
  const t = thresholds[type];
  if (!t) return null;
  if (value <= t[0]) return 'Good';
  if (value <= t[1]) return 'Moderate';
  if (value <= t[2]) return 'Unhealthy';
  return 'Very Unhealthy';
}
