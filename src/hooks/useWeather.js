import { useState, useEffect, useCallback } from 'react';
import { fetchWeather, fetchAirQuality } from '../services/weatherApi';
import { fetchAlerts } from '../services/alertsApi';

export function useWeather(location) {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadData = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    setError(null);
    try {
      const [weatherData, aqData, alertData] = await Promise.allSettled([
        fetchWeather(location.latitude, location.longitude),
        fetchAirQuality(location.latitude, location.longitude),
        fetchAlerts(location.latitude, location.longitude),
      ]);
      if (weatherData.status === 'fulfilled') setWeather(weatherData.value);
      else throw weatherData.reason;
      if (aqData.status === 'fulfilled') setAirQuality(aqData.value);
      if (alertData.status === 'fulfilled') setAlerts(alertData.value);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadData]);

  return { weather, airQuality, alerts, loading, error, lastUpdate, refresh: loadData };
}
