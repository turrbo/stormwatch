import {
  LayoutDashboard, Map, Calendar, AlertTriangle, Wind, Camera,
  Satellite, Zap, BarChart3, Globe, Snowflake, History, Radio,
  LineChart, Building2, CloudLightning, Layers
} from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'radar', label: 'Radar', icon: Map },
  { id: 'satellite', label: 'Satellite', icon: Satellite },
  { id: 'lightning', label: 'Lightning', icon: Zap },
  { id: 'models', label: 'Models', icon: BarChart3 },
  { id: 'surface', label: 'Surface', icon: Layers },
  { id: 'ventusky', label: 'Ventusky', icon: Globe },
  { id: 'tropical', label: 'Tropical', icon: CloudLightning },
  { id: 'forecast', label: '10-Day', icon: Calendar },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'airquality', label: 'Air', icon: Wind },
  { id: 'pws', label: 'PWS', icon: Radio },
  { id: 'meteograms', label: 'Meteograms', icon: LineChart },
  { id: 'nws', label: 'NWS', icon: Building2 },
  { id: 'snow', label: 'Snow', icon: Snowflake },
  { id: 'historical', label: 'History', icon: History },
  { id: 'cameras', label: 'Cameras', icon: Camera },
];

export default function Navigation({ activeTab, onTabChange, alertCount = 0 }) {
  return (
    <nav className="sticky top-[68px] z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-700/30">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-0.5 gap-y-0 px-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-2.5 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all
                border-b-2 relative
                ${isActive
                  ? 'text-red-400 border-red-400'
                  : 'text-neutral-500 border-transparent hover:text-neutral-300 hover:border-neutral-600'}`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.id === 'alerts' && alertCount > 0 && (
                <span className="w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white animate-pulse-glow">
                  {alertCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
