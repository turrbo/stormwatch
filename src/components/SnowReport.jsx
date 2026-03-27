import { useState, useEffect } from 'react';
import { Snowflake, Mountain, Search, AlertTriangle, TrendingUp } from 'lucide-react';
import { POPULAR_RESORTS, fetchSnowSummary, searchResorts } from '../services/opensnowApi';

export default function SnowReport() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    loadPopularResorts();
  }, []);

  async function loadPopularResorts() {
    setLoading(true);
    const results = await Promise.allSettled(
      POPULAR_RESORTS.map(async (r) => {
        try {
          const data = await fetchSnowSummary(r.slug);
          return { ...r, data };
        } catch {
          return { ...r, data: null };
        }
      })
    );
    setResorts(results.filter(r => r.status === 'fulfilled').map(r => r.value));
    setLoading(false);
  }

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      const results = await searchResorts(searchQuery);
      setSearchResults(Array.isArray(results) ? results.slice(0, 8) : []);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
            Ski resort conditions via OpenSnow -- snowfall, depth, and quality
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search ski resorts..."
          className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl pl-9 pr-4 py-2.5 text-sm
            text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25"
        />
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 glass-panel py-1 shadow-xl max-h-64 overflow-y-auto z-50">
            {searchResults.map((r, i) => (
              <button key={i}
                className="w-full text-left px-3 py-2 hover:bg-slate-700/50 text-sm text-slate-300 transition-colors">
                <Mountain size={12} className="inline mr-2 text-sky-400" />
                {r.name || r.title || JSON.stringify(r).slice(0, 50)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Resort grid */}
      {loading ? (
        <div className="glass-panel p-8 text-center">
          <Snowflake size={32} className="text-sky-400/50 mx-auto mb-2 animate-spin" />
          <p className="text-sm text-slate-500">Loading resort conditions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resorts.map((resort) => (
            <ResortCard key={resort.slug} resort={resort} />
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-600 text-center">
        Snow data from OpenSnow -- conditions may vary, check resort for latest updates
      </p>
    </div>
  );
}

function ResortCard({ resort }) {
  const d = resort.data;
  const hasData = d && (d.snow_past_24h != null || d.snow_depth != null || d.snow_summary);

  return (
    <div className="glass-panel p-4 hover:border-sky-500/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">{resort.name}</h4>
          <p className="text-xs text-slate-500">{resort.state}</p>
        </div>
        <Mountain size={18} className="text-sky-400/50" />
      </div>

      {hasData ? (
        <div className="space-y-2">
          {d.snow_past_24h != null && (
            <StatRow label="24h Snowfall" value={`${d.snow_past_24h}"`} highlight={d.snow_past_24h > 6} />
          )}
          {d.snow_past_48h != null && (
            <StatRow label="48h Snowfall" value={`${d.snow_past_48h}"`} />
          )}
          {d.snow_depth != null && (
            <StatRow label="Snow Depth" value={`${d.snow_depth}"`} />
          )}
          {d.base_depth != null && (
            <StatRow label="Base Depth" value={`${d.base_depth}"`} />
          )}
          {d.quality_rating != null && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Quality</span>
              <QualityBadge rating={d.quality_rating} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-xs text-slate-500 italic">
          {d?.message || 'Data unavailable -- resort may be closed or API rate-limited'}
        </div>
      )}
    </div>
  );
}

function StatRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-sky-300' : 'text-slate-300'}`}>
        {highlight && <TrendingUp size={12} className="inline mr-1 text-sky-400" />}
        {value}
      </span>
    </div>
  );
}

function QualityBadge({ rating }) {
  const colors = {
    5: 'bg-sky-500/20 text-sky-300',
    4: 'bg-green-500/20 text-green-300',
    3: 'bg-yellow-500/20 text-yellow-300',
    2: 'bg-orange-500/20 text-orange-300',
    1: 'bg-red-500/20 text-red-300',
  };
  const labels = { 5: 'Epic', 4: 'Good', 3: 'Fair', 2: 'Poor', 1: 'Bad' };
  const r = Math.round(rating);
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[r] || 'bg-slate-700 text-slate-400'}`}>
      {labels[r] || `${rating}/5`}
    </span>
  );
}
