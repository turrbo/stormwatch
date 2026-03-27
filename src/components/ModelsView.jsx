import { useState } from 'react';
import { BarChart3, Layers, MapPin } from 'lucide-react';
import { MODELS, PRODUCTS, REGIONS, getModelPageUrl } from '../services/tropicalTidbitsApi';
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
          <h3 className="text-lg font-semibold text-slate-200">NWP Models</h3>
          <p className="text-sm text-slate-500">
            Model maps from Tropical Tidbits + Pivotal Weather + SpotWX
          </p>
        </div>
      </div>

      {/* Source tabs */}
      <div className="flex items-center gap-1.5">
        {[
          { id: 'tropical', label: 'Tropical Tidbits', color: 'emerald' },
          { id: 'pivotal', label: 'Pivotal Weather', color: 'cyan' },
          { id: 'spotwx', label: 'SpotWX (Point)', color: 'amber' },
        ].map(s => (
          <button key={s.id} onClick={() => setSource(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${source === s.id
                ? `bg-${s.color}-500/20 text-${s.color}-300 border border-${s.color}-500/40`
                : 'bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-200'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Tropical Tidbits */}
      {source === 'tropical' && (
        <div className="space-y-3">
          {/* Model */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Layers size={13} className="text-slate-500" />
            {TT_MODEL_KEYS.map(m => (
              <button key={m} onClick={() => setModel(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${model === m
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {MODELS[m].label}
              </button>
            ))}
          </div>

          {/* Product */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <BarChart3 size={13} className="text-slate-500" />
            {TT_PRODUCT_KEYS.map(p => (
              <button key={p} onClick={() => setProduct(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${product === p
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {PRODUCTS[p]}
              </button>
            ))}
          </div>

          {/* Region */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <MapPin size={13} className="text-slate-500" />
            {TT_REGION_KEYS.map(r => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${region === r
                    ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {REGIONS[r]}
              </button>
            ))}
          </div>

          {/* Model page embed */}
          <div className="glass-panel overflow-hidden">
            <div style={{ height: 'calc(100vh - 360px)', minHeight: 500 }}>
              <iframe
                src={getModelPageUrl(model, region, product)}
                className="w-full h-full border-0"
                title={`${MODELS[model]?.label} - ${PRODUCTS[product]}`}
                allow="fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Pivotal Weather */}
      {source === 'pivotal' && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Layers size={13} className="text-slate-500" />
            {Object.keys(PV_MODELS).map(m => (
              <button key={m} onClick={() => setPvModel(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${pvModel === m
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {PV_MODELS[m].label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <BarChart3 size={13} className="text-slate-500" />
            {Object.keys(PV_PRODUCTS).map(p => (
              <button key={p} onClick={() => setPvProduct(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${pvProduct === p
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {PV_PRODUCTS[p]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <MapPin size={13} className="text-slate-500" />
            {Object.keys(PV_SECTORS).map(s => (
              <button key={s} onClick={() => setPvSector(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${pvSector === s
                    ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {PV_SECTORS[s]}
              </button>
            ))}
          </div>

          <div className="glass-panel overflow-hidden">
            <div style={{ height: 'calc(100vh - 360px)', minHeight: 500 }}>
              <iframe
                src={`https://www.pivotalweather.com/model.php?m=${pvModel}&p=${pvProduct}&rg=${pvSector}`}
                className="w-full h-full border-0"
                title={`Pivotal Weather - ${PV_MODELS[pvModel]?.label}`}
                allow="fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* SpotWX */}
      {source === 'spotwx' && (
        <SpotWXView />
      )}

      <p className="text-[11px] text-slate-600 text-center">
        NWP model data from Tropical Tidbits, Pivotal Weather, and SpotWX
      </p>
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
                : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
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
