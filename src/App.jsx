import { useState } from 'react';
import { useLocation } from './hooks/useLocation';
import { useWeather } from './hooks/useWeather';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import RadarMap from './components/RadarMap';
import DailyForecast from './components/DailyForecast';
import AlertsPanel from './components/AlertsPanel';
import AirQuality from './components/AirQuality';
import Cameras from './components/Cameras';
import LoadingSpinner from './components/LoadingSpinner';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
    location, loading: locLoading, savedLocations,
    setActiveLocation, detectLocation, saveLocation, removeLocation,
  } = useLocation();

  const {
    weather, airQuality, alerts, loading: weatherLoading,
    error, lastUpdate, refresh,
  } = useWeather(location);

  const isLoading = locLoading || weatherLoading;

  return (
    <div className="min-h-screen weather-gradient">
      <Header
        location={location}
        savedLocations={savedLocations}
        onSelectLocation={setActiveLocation}
        onDetectLocation={detectLocation}
        onSaveLocation={saveLocation}
        onRemoveLocation={removeLocation}
        onRefresh={refresh}
        lastUpdate={lastUpdate}
      />

      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alertCount={alerts.length}
      />

      <main className="max-w-7xl mx-auto px-4 py-4 pb-8">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            <span className="text-sm text-red-300">{error}</span>
          </div>
        )}

        {isLoading && !weather ? (
          <LoadingSpinner />
        ) : weather ? (
          <div className="animate-fade-in">
            {activeTab === 'dashboard' && <Dashboard weather={weather} alerts={alerts} />}
            {activeTab === 'radar' && <RadarMap location={location} />}
            {activeTab === 'forecast' && <DailyForecast weather={weather} />}
            {activeTab === 'alerts' && <AlertsPanel alerts={alerts} />}
            {activeTab === 'airquality' && <AirQuality airQuality={airQuality} weather={weather} />}
            {activeTab === 'cameras' && <Cameras location={location} />}
          </div>
        ) : null}
      </main>
    </div>
  );
}
