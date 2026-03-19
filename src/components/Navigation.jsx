import { LayoutDashboard, Map, Calendar, AlertTriangle, Wind, Camera } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'radar', label: 'Radar', icon: Map },
  { id: 'forecast', label: '10-Day', icon: Calendar },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'airquality', label: 'Air Quality', icon: Wind },
  { id: 'cameras', label: 'Cameras', icon: Camera },
];

export default function Navigation({ activeTab, onTabChange, alertCount = 0 }) {
  return (
    <nav className="sticky top-[68px] z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto flex overflow-x-auto hourly-scroll">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all
                border-b-2 relative
                ${isActive
                  ? 'text-blue-400 border-blue-400'
                  : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-600'}`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.id === 'alerts' && alertCount > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-pulse-glow">
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
