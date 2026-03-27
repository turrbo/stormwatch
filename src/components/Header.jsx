import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Bookmark, BookmarkCheck, RefreshCw, Navigation } from 'lucide-react';
import { searchLocations } from '../services/geocodingApi';

export default function Header({
  location, savedLocations, onSelectLocation, onDetectLocation,
  onSaveLocation, onRemoveLocation, onRefresh, lastUpdate,
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const savedRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (query.length < 2) { setResults([]); return; }
    timerRef.current = setTimeout(async () => {
      const r = await searchLocations(query);
      setResults(r);
      setShowResults(true);
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowResults(false);
      }
      if (savedRef.current && !savedRef.current.contains(e.target)) {
        setShowSaved(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectLocation = (loc) => {
    onSelectLocation(loc);
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const isSaved = location && savedLocations.some(
    s => s.latitude === location.latitude && s.longitude === location.longitude
  );

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-neutral-700/50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-[42px] h-[42px] rounded-md flex items-center justify-center"
            style={{ backgroundColor: '#C8102E' }}>
            <span className="text-white text-[13px] font-bold leading-none tracking-tight">EOC</span>
          </div>
          <div className="text-center">
            <h1 className="text-white text-lg sm:text-xl font-bold leading-none"
              style={{ letterSpacing: '1.5px' }}>EOC</h1>
            <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">Emergency Operation Center</p>
          </div>
        </div>

        <div className="relative flex-1 max-w-md" ref={dropdownRef}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if (results.length) setShowResults(true); }}
              placeholder="Search city or state..."
              className="w-full bg-neutral-800/80 border border-neutral-600/50 rounded-xl pl-9 pr-8 py-2 text-sm
                         text-neutral-200 placeholder-neutral-500 outline-none focus:border-red-500/50 focus:ring-1
                         focus:ring-red-500/25 transition-all"
            />
            {query && (
              <button onClick={() => { setQuery(''); setResults([]); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300">
                <X size={14} />
              </button>
            )}
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 glass-panel py-1 shadow-xl max-h-64 overflow-y-auto z-50">
              {results.map((r) => (
                <button key={r.id} onClick={() => selectLocation(r)}
                  className="w-full text-left px-3 py-2.5 hover:bg-neutral-700/50 flex items-center gap-2 transition-colors">
                  <MapPin size={14} className="text-neutral-400 shrink-0" />
                  <div>
                    <div className="text-sm text-neutral-200">{r.name}</div>
                    <div className="text-xs text-neutral-500">{r.admin1}{r.country ? `, ${r.country}` : ''}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={onDetectLocation} title="Detect location"
            className="p-2 rounded-lg hover:bg-neutral-700/50 text-neutral-400 hover:text-red-400 transition-colors">
            <Navigation size={16} />
          </button>

          {location && (
            <button onClick={() => isSaved
              ? onRemoveLocation(savedLocations.find(s => s.latitude === location.latitude)?.id)
              : onSaveLocation(location)
            } title={isSaved ? 'Remove bookmark' : 'Bookmark location'}
              className="p-2 rounded-lg hover:bg-neutral-700/50 text-neutral-400 hover:text-yellow-400 transition-colors">
              {isSaved ? <BookmarkCheck size={16} className="text-yellow-400" /> : <Bookmark size={16} />}
            </button>
          )}

          <div className="relative" ref={savedRef}>
            <button onClick={() => setShowSaved(!showSaved)} title="Saved locations"
              className="p-2 rounded-lg hover:bg-neutral-700/50 text-neutral-400 hover:text-neutral-200 transition-colors">
              <MapPin size={16} />
              {savedLocations.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px]
                  font-bold flex items-center justify-center text-white">{savedLocations.length}</span>
              )}
            </button>
            {showSaved && savedLocations.length > 0 && (
              <div className="absolute top-full right-0 mt-1 glass-panel py-1 shadow-xl w-56 z-50">
                <div className="px-3 py-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">Saved Locations</div>
                {savedLocations.map(s => (
                  <div key={s.id}
                    className="w-full text-left px-3 py-2 hover:bg-neutral-700/50 flex items-center justify-between transition-colors cursor-pointer"
                    onClick={() => { onSelectLocation(s); setShowSaved(false); }}>
                    <span className="text-sm text-neutral-300">{s.label || s.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); onRemoveLocation(s.id); }}
                      className="text-neutral-600 hover:text-red-400 p-0.5"><X size={12} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={onRefresh} title="Refresh data"
            className="p-2 rounded-lg hover:bg-neutral-700/50 text-neutral-400 hover:text-green-400 transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {location && (
        <div className="max-w-7xl mx-auto mt-1 flex items-center gap-2 text-xs text-neutral-500">
          <MapPin size={10} />
          <span>{location.label || location.name}</span>
          {lastUpdate && (
            <>
              <span className="text-neutral-700">|</span>
              <span>Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </>
          )}
        </div>
      )}
    </header>
  );
}

