import { AlertTriangle } from 'lucide-react';
import { getAlertColor } from '../services/alertsApi';

export default function MiniAlerts({ alerts }) {
  if (!alerts.length) return null;
  const top = alerts[0];
  const color = getAlertColor(top.severity);

  return (
    <div className="rounded-xl p-3 flex items-center gap-3 animate-slide-up"
      style={{ background: color.bg, border: `1px solid ${color.border}40` }}>
      <AlertTriangle size={18} style={{ color: color.text }} className="shrink-0 animate-pulse-glow" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: color.text }}>{top.event}</p>
        <p className="text-xs text-slate-400 truncate">{top.headline}</p>
      </div>
      {alerts.length > 1 && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
          +{alerts.length - 1} more
        </span>
      )}
    </div>
  );
}
