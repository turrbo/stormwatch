import { useState, useCallback, useEffect } from 'react';
import { reverseGeocode } from '../services/geocodingApi';

const STORAGE_KEY = 'stormwatch_locations';
const ACTIVE_KEY = 'stormwatch_active_location';

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

function loadActive() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVE_KEY));
  } catch { return null; }
}

export function useLocation() {
  const [location, setLocation] = useState(loadActive);
  const [savedLocations, setSavedLocations] = useState(loadSaved);
  const [loading, setLoading] = useState(!loadActive());
  const [error, setError] = useState(null);

  const setActiveLocation = useCallback((loc) => {
    setLocation(loc);
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(loc));
  }, []);

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false, timeout: 10000,
        });
      });
      const { latitude, longitude } = pos.coords;
      const geo = await reverseGeocode(latitude, longitude);
      const loc = {
        id: 'current',
        name: geo.name,
        admin1: geo.admin1,
        country: geo.country,
        latitude,
        longitude,
        label: geo.label || geo.name,
        isCurrent: true,
      };
      setActiveLocation(loc);
    } catch (err) {
      setError('Could not detect location. Please search for a city.');
      const fallback = {
        id: 'default',
        name: 'New York',
        admin1: 'New York',
        country: 'United States',
        latitude: 40.7128,
        longitude: -74.006,
        label: 'New York, NY',
      };
      setActiveLocation(fallback);
    } finally {
      setLoading(false);
    }
  }, [setActiveLocation]);

  const saveLocation = useCallback((loc) => {
    setSavedLocations(prev => {
      const exists = prev.find(s => s.latitude === loc.latitude && s.longitude === loc.longitude);
      if (exists) return prev;
      const next = [...prev, { ...loc, id: `saved_${Date.now()}` }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeLocation = useCallback((id) => {
    setSavedLocations(prev => {
      const next = prev.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    if (!location) detectLocation();
  }, [location, detectLocation]);

  return {
    location, loading, error, savedLocations,
    setActiveLocation, detectLocation, saveLocation, removeLocation,
  };
}
