import { useState } from 'react';
import { BarChart3, Layers, MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { MODELS, PRODUCTS, REGIONS } from '../services/tropicalTidbitsApi';
import { PV_MODELS, PV_PRODUCTS, PV_SECTORS } from '../services/pivotalWeatherApi';

const TT_MODEL_KEYS = Object.keys(MODELS);
const TT_PRODUCT_KEYS = Object.keys(PRODUCTS);
const TT_REGION_KEYS = Object.keys(REGIONS);

export default function ModelsView() {
  const [source, setSource] = useState('tropical');
  const [model, setModel] = useState('gfs');
  const [product, setProduct] = useState('mslp_pcpn');
  const [region, setRegion] = useState('us');

  // Pivotal Weather state
  const [pvModel, setPvModel] = useState('GFS');
  const [pvProduct, setPvProduct] = useState('sfcT_pointed');
  const [pvSector, setPvSector] = useState('US');

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <BarChart3 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-200">NWP Models</h3>
          <p className="text-sm text-neutral-500">
            Model maps from Tropical Tidbits + Pivotal Weather + SpotWX
          </p>
        </div>
      </div>

      {/* Source tabs */}
      <div className="flex items-center gap-1.5">
        {[
          { id: 'tropical', label: 'Tropical Tidbits' },
          { id: 'pivotal', label: 'Pivotal Weather' },
          { id: 'spotwx', label: 'SpotWX (Point)' },
        ].map(s => (
          <button key={s.id} onClick={() => setSource(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${source === s.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-neutral-800/40 text-neutral-400 border border-neutral-700/30 hover:text-neutral-200'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Tropical Tidbits */}
      {source === 'tropical' && (
        <TropicalTidbitsView
          model={model} setModel={setModel}
          product={product} setProduct={setProduct}
          region={region} setRegion={setRegion}
        />
      )}

      {/* Pivotal Weather */}
      {source === 'pivotal' && (
        <PivotalWeatherView
          pvModel={pvModel} setPvModel={setPvModel}
          pvProduct={pvProduct} setPvProduct={setPvProduct}
          pvSector={pvSector} setPvSector={setPvSector}
        />
      )}

      {/* SpotWX */}
      {source === 'spotwx' && (
        <SpotWXView />
      )}

      <p className="text-[11px] text-neutral-600 text-center">
        NWP model data from Tropical Tidbits, Pivotal Weather, and SpotWX
      </p>
    </div>
  );
}

function TropicalTidbitsView({ model, setModel, product, setProduct, region, setRegion }) {
  const [imgKey, setImgKey] = useState(0);
  const ttUrl = `https://www.tropicaltidbits.com/analysis/models/?model=${model}&region=${region}&pkg=${product}`;

  return (
    <div className="space-y-3">
      {/* Model */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Layers size={13} className="text-neutral-500" />
        {TT_MODEL_KEYS.map(m => (
          <button key={m} onClick={() => setModel(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${model === m
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {MODELS[m].label}
          </button>
        ))}
      </div>

      {/* Product */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <BarChart3 size={13} className="text-neutral-500" />
        {TT_PRODUCT_KEYS.map(p => (
          <button key={p} onClick={() => setProduct(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${product === p
                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {PRODUCTS[p]}
          </button>
        ))}
      </div>

      {/* Region */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <MapPin size={13} className="text-neutral-500" />
        {TT_REGION_KEYS.map(r => (
          <button key={r} onClick={() => setRegion(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${region === r
                ? 'bg-red-500/25 text-red-300 border border-red-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {REGIONS[r]}
          </button>
        ))}
      </div>

      {/* Open in TT + NOAA WPC inline previews */}
      <a href={ttUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-sm font-medium">
        <ExternalLink size={16} />
        Open {MODELS[model]?.label} / {PRODUCTS[product]} / {REGIONS[region]} in Tropical Tidbits
      </a>

      {/* Inline NOAA model products as preview */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-700/30 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">
            NOAA WPC -- National Forecast Chart (inline preview)
          </span>
          <button onClick={() => setImgKey(k => k + 1)}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 transition-colors">
            <RefreshCw size={11} /> Refresh
          </button>
        </div>
        <div className="relative bg-neutral-900">
          <img
            key={imgKey}
            src={`https://www.wpc.ncep.noaa.gov/NationalForecastChart/staticimages/noaaforecast-day1.png?t=${Date.now()}-${imgKey}`}
            alt="NOAA National Forecast Day 1"
            className="w-full h-auto"
            onError={(e) => { e.target.style.opacity = '0.3'; e.target.alt = 'Image unavailable'; }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="glass-panel overflow-hidden">
          <div className="px-3 py-2 border-b border-neutral-700/30 text-xs font-medium text-neutral-400">
            Surface Analysis (current)
          </div>
          <img
            src={`https://www.wpc.ncep.noaa.gov/sfc/namussfcwbg.gif?t=${Date.now()}`}
            alt="Surface Analysis"
            className="w-full h-auto"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
        <div className="glass-panel overflow-hidden">
          <div className="px-3 py-2 border-b border-neutral-700/30 text-xs font-medium text-neutral-400">
            Day 1 QPF (24h Precip)
          </div>
          <img
            src={`https://www.wpc.ncep.noaa.gov/qpf/p24i.gif?t=${Date.now()}`}
            alt="QPF Day 1"
            className="w-full h-auto"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
      </div>
    </div>
  );
}

function PivotalWeatherView({ pvModel, setPvModel, pvProduct, setPvProduct, pvSector, setPvSector }) {
  const pvUrl = `https://www.pivotalweather.com/model.php?m=${pvModel}&p=${pvProduct}&rg=${pvSector}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 flex-wrap">
        <Layers size={13} className="text-neutral-500" />
        {Object.keys(PV_MODELS).map(m => (
          <button key={m} onClick={() => setPvModel(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${pvModel === m
                ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {PV_MODELS[m].label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <BarChart3 size={13} className="text-neutral-500" />
        {Object.keys(PV_PRODUCTS).map(p => (
          <button key={p} onClick={() => setPvProduct(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${pvProduct === p
                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {PV_PRODUCTS[p]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <MapPin size={13} className="text-neutral-500" />
        {Object.keys(PV_SECTORS).map(s => (
          <button key={s} onClick={() => setPvSector(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${pvSector === s
                ? 'bg-red-500/25 text-red-300 border border-red-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {PV_SECTORS[s]}
          </button>
        ))}
      </div>

      <a href={pvUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all text-sm font-medium">
        <ExternalLink size={16} />
        Open {PV_MODELS[pvModel]?.label} / {PV_PRODUCTS[pvProduct]} / {PV_SECTORS[pvSector]} in Pivotal Weather
      </a>

      {/* NOAA model previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="glass-panel overflow-hidden">
          <div className="px-3 py-2 border-b border-neutral-700/30 text-xs font-medium text-neutral-400">
            National Forecast Day 2
          </div>
          <img
            src={`https://www.wpc.ncep.noaa.gov/NationalForecastChart/staticimages/noaaforecast-day2.png?t=${Date.now()}`}
            alt="National Forecast Day 2"
            className="w-full h-auto"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
        <div className="glass-panel overflow-hidden">
          <div className="px-3 py-2 border-b border-neutral-700/30 text-xs font-medium text-neutral-400">
            National Forecast Day 3
          </div>
          <img
            src={`https://www.wpc.ncep.noaa.gov/NationalForecastChart/staticimages/noaaforecast-day3.png?t=${Date.now()}`}
            alt="National Forecast Day 3"
            className="w-full h-auto"
            onError={(e) => { e.target.style.opacity = '0.3'; }}
          />
        </div>
      </div>
    </div>
  );
}

function SpotWXView() {
  const [selModel, setSelModel] = useState('gfs');
  const models = [
    { id: 'gfs', label: 'GFS' },
    { id: 'hrrr', label: 'HRRR' },
    { id: 'nam', label: 'NAM' },
    { id: 'ecmwf', label: 'ECMWF' },
    { id: 'gem_glb', label: 'GEM Global' },
    { id: 'gem_reg', label: 'GEM Regional' },
    { id: 'hrdps', label: 'HRDPS 2.5km' },
    { id: 'icon-eu', label: 'ICON-EU' },
  ];

  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <p className="text-xs text-amber-300">
          SpotWX provides point-specific model data at any lat/lon. Select a model below to view the forecast page.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {models.map(m => (
          <button key={m.id} onClick={() => setSelModel(m.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${selModel === m.id
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50'
                : 'bg-neutral-800/60 text-neutral-400 border border-neutral-700/40 hover:text-neutral-200'}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="glass-panel overflow-hidden">
        <div style={{ height: 'calc(100vh - 360px)', minHeight: 500 }}>
          <iframe
            src={`https://spotwx.com/products/grib_index.php?model=${selModel}&lat=40.71&lon=-74.01&tz=America%2FNew_York&display=table`}
            className="w-full h-full border-0"
            title={`SpotWX - ${models.find(m => m.id === selModel)?.label}`}
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
