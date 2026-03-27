import { useState, useEffect } from 'react';
import { Map, FileText, CloudRain, Snowflake, AlertTriangle, RefreshCw } from 'lucide-react';
import { SURFACE_ANALYSIS, QPF_PRODUCTS, NATIONAL_FORECAST, ERO, WINTER_PRODUCTS, DISCUSSIONS, fetchDiscussion } from '../services/noaaWpcApi';

const ANALYSIS_TABS = [
  { id: 'surface', label: 'Surface Analysis', icon: Map },
  { id: 'qpf', label: 'QPF', icon: CloudRain },
  { id: 'national', label: 'Nat. Forecast', icon: Map },
  { id: 'ero', label: 'Excessive Rain', icon: AlertTriangle },
  { id: 'winter', label: 'Winter', icon: Snowflake },
  { id: 'discussion', label: 'Discussion', icon: FileText },
];

const QPF_LABELS = {
  day1_24h: 'Day 1 (24h)',
  day2_24h: 'Day 2 (24h)',
  day3_24h: 'Day 3 (24h)',
  day5_accum: '5-Day Accum.',
  day7_accum: '7-Day Accum.',
};

export default function SurfaceAnalysis() {
  const [tab, setTab] = useState('surface');
  const [qpfSel, setQpfSel] = useState('day1_24h');
  const [natDay, setNatDay] = useState('day1');
  const [eroDay, setEroDay] = useState('day1');
  const [discType, setDiscType] = useState('pmdspd');
  const [discussion, setDiscussion] = useState('');
  const [loadingDisc, setLoadingDisc] = useState(false);
  const [imgKey, setImgKey] = useState(Date.now());

  useEffect(() => {
    if (tab !== 'discussion') return;
    setLoadingDisc(true);
    fetchDiscussion(discType)
      .then(text => setDiscussion(text))
      .catch(() => setDiscussion('Failed to load discussion.'))
      .finally(() => setLoadingDisc(false));
  }, [tab, discType]);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
          <Map size={20} className="text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Surface Analysis</h3>
          <p className="text-sm text-slate-500">
            NOAA Weather Prediction Center -- fronts, QPF, ERO, winter products
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {ANALYSIS_TABS.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${tab === t.id
                  ? 'bg-teal-500/25 text-teal-300 border border-teal-500/50'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
              <Icon size={13} /> {t.label}
            </button>
          );
        })}
        <button onClick={() => setImgKey(Date.now())}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200 transition-all ml-auto flex items-center gap-1">
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      {/* Surface Analysis */}
      {tab === 'surface' && (
        <div className="glass-panel overflow-hidden">
          <img
            key={`sfc-${imgKey}`}
            src={`${SURFACE_ANALYSIS.current}?t=${imgKey}`}
            alt="Current Surface Analysis"
            className="w-full h-auto bg-slate-800"
            style={{ minHeight: 300 }}
            onError={(e) => { e.target.style.opacity = '0.3'; e.target.alt = 'Surface analysis image unavailable -- try refreshing'; }}
          />
        </div>
      )}

      {/* QPF */}
      {tab === 'qpf' && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.entries(QPF_LABELS).map(([k, v]) => (
              <button key={k} onClick={() => setQpfSel(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${qpfSel === k
                    ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {v}
              </button>
            ))}
          </div>
          <div className="glass-panel overflow-hidden">
            <img
              key={`qpf-${qpfSel}-${imgKey}`}
              src={`${QPF_PRODUCTS[qpfSel]}?t=${imgKey}`}
              alt={`QPF - ${QPF_LABELS[qpfSel]}`}
              className="w-full h-auto bg-slate-800"
              style={{ minHeight: 300 }}
              onError={(e) => { e.target.style.opacity = '0.3'; }}
            />
          </div>
        </div>
      )}

      {/* National Forecast */}
      {tab === 'national' && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            {['day1', 'day2', 'day3'].map(d => (
              <button key={d} onClick={() => setNatDay(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${natDay === d
                    ? 'bg-green-500/25 text-green-300 border border-green-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {d.replace('day', 'Day ')}
              </button>
            ))}
          </div>
          <div className="glass-panel overflow-hidden">
            <img
              key={`nat-${natDay}-${imgKey}`}
              src={`${NATIONAL_FORECAST[natDay]}?t=${imgKey}`}
              alt={`National Forecast ${natDay}`}
              className="w-full h-auto bg-slate-800"
              style={{ minHeight: 300 }}
              onError={(e) => { e.target.style.opacity = '0.3'; }}
            />
          </div>
        </div>
      )}

      {/* ERO */}
      {tab === 'ero' && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            {['day1', 'day2', 'day3'].map(d => (
              <button key={d} onClick={() => setEroDay(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${eroDay === d
                    ? 'bg-orange-500/25 text-orange-300 border border-orange-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {d.replace('day', 'Day ')}
              </button>
            ))}
          </div>
          <div className="glass-panel overflow-hidden">
            <img
              key={`ero-${eroDay}-${imgKey}`}
              src={`${ERO[eroDay]}?t=${imgKey}`}
              alt={`ERO ${eroDay}`}
              className="w-full h-auto bg-slate-800"
              style={{ minHeight: 300 }}
              onError={(e) => { e.target.style.opacity = '0.3'; }}
            />
          </div>
        </div>
      )}

      {/* Winter */}
      {tab === 'winter' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="glass-panel overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-700/30 text-xs font-medium text-slate-400">
                Winter Storm Severity Index (WSSI)
              </div>
              <img key={`wssi-${imgKey}`} src={`${WINTER_PRODUCTS.wssi}?t=${imgKey}`} alt="WSSI" className="w-full h-auto bg-slate-800"
                onError={(e) => { e.target.style.opacity = '0.3'; }} />
            </div>
            <div className="glass-panel overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-700/30 text-xs font-medium text-slate-400">
                Snow Probability (24h)
              </div>
              <img key={`snow24-${imgKey}`} src={`${WINTER_PRODUCTS.prob_snow_24}?t=${imgKey}`} alt="Snow Probability" className="w-full h-auto bg-slate-800"
                onError={(e) => { e.target.style.opacity = '0.3'; }} />
            </div>
          </div>
        </div>
      )}

      {/* Discussion */}
      {tab === 'discussion' && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            {Object.entries(DISCUSSIONS).map(([key, val]) => (
              <button key={key} onClick={() => setDiscType(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${discType === val
                    ? 'bg-teal-500/25 text-teal-300 border border-teal-500/50'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                {key === 'shortRange' ? 'Short Range' : key === 'extended' ? 'Extended' : 'QPF'}
              </button>
            ))}
          </div>
          <div className="glass-panel p-4">
            {loadingDisc ? (
              <div className="text-sm text-slate-500 animate-pulse">Loading discussion...</div>
            ) : (
              <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono max-h-[60vh] overflow-y-auto">
                {discussion}
              </pre>
            )}
          </div>
        </div>
      )}

      <p className="text-[11px] text-slate-600 text-center">
        Products from NOAA Weather Prediction Center (WPC) -- public US government data
      </p>
    </div>
  );
}
