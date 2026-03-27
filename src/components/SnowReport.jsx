import { useState } from 'react';
import { Snowflake, Mountain, RefreshCw, ExternalLink, MapPin } from 'lucide-react';

// NOAA NOHRSC Snow Model regions that return valid images
const SNOW_REGIONS = [
  { id: 'National', label: 'National' },
  { id: 'Northwest', label: 'Northwest' },
  { id: 'Northeast', label: 'Northeast' },
  { id: 'Sierra_Nevada', label: 'Sierra Nevada' },
];

const SNOW_PRODUCTS = {
  nsm_depth: { label: 'Snow Depth', desc: 'Current modeled snow depth' },
  nsm_swe: { label: 'Snow Water Equiv.', desc: 'Snow water equivalent' },
};

// Generate today's date in YYYYMMDD05 format for NOHRSC URLs
function getNohrscDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}05`;
}

function getNohrscYM() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}${m}`;
}

function getSnowImageUrl(product, region) {
  return `https://www.nohrsc.noaa.gov/snow_model/images/full/${region}/${product}/${getNohrscYM()}/${product}_${getNohrscDate()}_${region}.jpg`;
}

// Popular ski resorts with direct links
const POPULAR_RESORTS = [
  { name: 'Vail', state: 'CO', url: 'https://www.vail.com/the-mountain/mountain-conditions/snow-and-weather-report' },
  { name: 'Park City', state: 'UT', url: 'https://www.parkcitymountain.com/the-mountain/mountain-conditions/snow-and-weather-report' },
  { name: 'Mammoth Mountain', state: 'CA', url: 'https://www.mammothmountain.com/mountain-information/mountain-conditions' },
  { name: 'Jackson Hole', state: 'WY', url: 'https://www.jacksonhole.com/mountain-report' },
  { name: 'Big Sky', state: 'MT', url: 'https://bigskyresort.com/conditions' },
  { name: 'Steamboat', state: 'CO', url: 'https://www.steamboat.com/the-mountain/mountain-report' },
  { name: 'Killington', state: 'VT', url: 'https://www.killington.com/conditions-weather' },
  { name: 'Alta', state: 'UT', url: 'https://www.alta.com/conditions' },
  { name: 'Telluride', state: 'CO', url: 'https://www.tellurideskiresort.com/the-mountain/conditions/' },
  { name: 'Aspen Snowmass', state: 'CO', url: 'https://www.aspensnowmass.com/our-mountains/conditions-report' },
  { name: 'Palisades Tahoe', state: 'CA', url: 'https://www.palisadestahoe.com/mountain-information/conditions' },
  { name: 'Snowbird', state: 'UT', url: 'https://www.snowbird.com/mountain-report/' },
];

export default function SnowReport() {
  const [region, setRegion] = useState('National');
  const [product, setProduct] = useState('nsm_depth');
  const [imgKey, setImgKey] = useState(0);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
          <Snowflake size={20} className="text-sky-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Snow Report</h3>
          <p className="text-sm text-slate-500">
            NOAA snow analysis + ski resort conditions
          </p>
        </div>
      </div>

      {/* Snow product selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {Object.entries(SNOW_PRODUCTS).map(([key, val]) => (
          <button key={key} onClick={() => setProduct(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${product === key
                ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {val.label}
          </button>
        ))}
      </div>

      {/* Region selector */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <MapPin size={13} className="text-slate-500" />
        {SNOW_REGIONS.map(r => (
          <button key={r.id} onClick={() => setRegion(r.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${region === r.id
                ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
            {r.label}
          </button>
        ))}
        <button onClick={() => setImgKey(k => k + 1)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 transition-all ml-auto flex items-center gap-1">
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      {/* Snow analysis image */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/30">
          <span className="text-sm font-medium text-slate-300">
            NOAA NOHRSC -- {SNOW_PRODUCTS[product]?.label} -- {SNOW_REGIONS.find(r => r.id === region)?.label}
          </span>
          <p className="text-xs text-slate-500 mt-0.5">{SNOW_PRODUCTS[product]?.desc}</p>
        </div>
        <div className="relative bg-slate-900">
          <img
            key={`snow-${product}-${region}-${imgKey}`}
            src={`${getSnowImageUrl(product, region)}?t=${Date.now()}-${imgKey}`}
            alt={`${SNOW_PRODUCTS[product]?.label} - ${region}`}
            className="w-full h-auto"
            style={{ minHeight: 300 }}
            onError={(e) => {
              e.target.style.opacity = '0.3';
              e.target.alt = 'Snow image unavailable -- data may not be available for this date yet';
            }}
          />
        </div>
      </div>

      {/* WPC Winter products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="glass-panel overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-700/30 text-xs font-medium text-slate-400">
            WPC Winter Storm Severity Index
          </div>
          <img
            key={`wssi-${imgKey}`}
            src={`https://www.wpc.ncep.noaa.gov/wwd/wssi/wssi_main_day1.png?t=${Date.now()}`}
            alt="Winter Storm Severity Index"
            className="w-full h-auto bg-slate-800"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
        <div className="glass-panel overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-700/30 text-xs font-medium text-slate-400">
            Snow Probability (24h)
          </div>
          <img
            key={`sprob-${imgKey}`}
            src={`https://www.wpc.ncep.noaa.gov/wwd/pwpf_d12/images/gifd2/PWPF_SNW24_D2.gif?t=${Date.now()}`}
            alt="Snow Probability 24h"
            className="w-full h-auto bg-slate-800"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
      </div>

      {/* Ski resort links */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700/30 flex items-center gap-2">
          <Mountain size={14} className="text-sky-400" />
          <span className="text-sm font-medium text-slate-300">Ski Resort Conditions</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-3">
          {POPULAR_RESORTS.map(resort => (
            <a key={resort.name} href={resort.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/30 hover:border-sky-500/30 hover:bg-slate-800 transition-all group">
              <Mountain size={14} className="text-sky-400/50 group-hover:text-sky-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-300 truncate">{resort.name}</div>
                <div className="text-[10px] text-slate-500">{resort.state}</div>
              </div>
              <ExternalLink size={10} className="text-slate-600 ml-auto shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Snow analysis from NOAA NOHRSC + WPC winter products -- resort links for current conditions
      </p>
    </div>
  );
}
