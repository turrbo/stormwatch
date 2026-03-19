import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import MiniAlerts from './MiniAlerts';

export default function Dashboard({ weather, alerts }) {
  return (
    <div className="space-y-4">
      {alerts.length > 0 && <MiniAlerts alerts={alerts} />}
      <CurrentWeather weather={weather} />
      <HourlyForecast weather={weather} />
    </div>
  );
}
