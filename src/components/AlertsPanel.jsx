import { useState } from 'react';
import { AlertTriangle, Clock, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { getAlertColor } from '../services/alertsApi';

export default function AlertsPanel({ alerts }) {
  const [expanded, setExpanded] = useState(null);

  if (!alerts.length) {
    return (
      <div className="glass-panel p-8 text-center animate-slide-up">
        <Shield size={48} className="text-green-500/50 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-300">All Clear</h3>
        <p className="text-sm text-slate-500 mt-1">No active weather alerts for this area.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center gap-2 px-1">
        <AlertTriangle size={16} className="text-amber-400" />
        <h3 className="text-sm font-medium text-slate-400">
          {alerts.length} Active Alert{alerts.length !== 1 ? 's' : ''}
        </h3>
      </div>

      {alerts.map((alert, i) => {
        const color = getAlertColor(alert.severity);
        const isExpanded = expanded === i;
        return (
          <div key={alert.id} className="rounded-xl overflow-hidden"
            style={{ background: color.bg, border: `1px solid ${color.border}30` }}>
            <button onClick={() => setExpanded(isExpanded ? null : i)}
              className="w-full flex items-start gap-3 p-4 text-left">
              <AlertTriangle size={18} style={{ color: color.text }} className="shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: color.text }}>{alert.event}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${color.border}30`, color: color.text }}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{alert.headline}</p>
                {alert.onset && (
                  <div className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-500">
                    <Clock size={10} />
                    <span>
                      {new Date(alert.onset).toLocaleDateString()} - {new Date(alert.expires).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
            </button>
            {isExpanded && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="border-t border-slate-700/30 pt-3">
                  {alert.description && (
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-slate-400 mb-1">Description</h4>
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{alert.description}</p>
                    </div>
                  )}
                  {alert.instruction && (
                    <div>
                      <h4 className="text-xs font-medium text-slate-400 mb-1">Instructions</h4>
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{alert.instruction}</p>
                    </div>
                  )}
                  {alert.senderName && (
                    <p className="text-[10px] text-slate-600 mt-2">Source: {alert.senderName}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
