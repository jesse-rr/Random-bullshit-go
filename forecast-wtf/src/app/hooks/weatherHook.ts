'use client'

import { useCallback, useEffect, useState } from "react";
import type { WeatherData } from "../types/weatherTypes";
import { fetchWeatherData } from "../utils/api";

interface UseWeatherResult {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  history: string[];
  selectCityFromHistory: (city: string) => void;
  currentLocation: string | null;
  detectLocation: () => Promise<void>;
}

export const useWeather = (): UseWeatherResult => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = typeof window !== 'undefined' ? localStorage.getItem('weatherAppHistory') : null;
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weatherAppHistory', JSON.stringify(history));
    }
  }, [history]);

  const addCityToHistory = useCallback((city: string) => {
    setHistory(prev => {
      const updated = [city, ...prev.filter(item => item.toLowerCase() !== city.toLowerCase())];
      return updated.slice(0, 5);
    });
  }, []);

  const searchCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      addCityToHistory(city);
    } catch (err: any) {
      setError(err.message || 'Falha ao capturar dados climáticos, por favor tente novamente.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, [addCityToHistory]);

  const selectCityFromHistory = useCallback((city: string) => {
    searchCity(city);
  }, [searchCity]);

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentLocation(null);
    try {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
          const data = await fetchWeatherData(coords);
          setWeatherData(data);
          const city = data.currentWeather?.location.name || 'Localização desconhecida';
          setCurrentLocation(city);
          addCityToHistory(city);
          setLoading(false);
        }, (geoError) => {
          setError(`Erro de geolocalização: ${geoError.message}. Por favor permita o acesso a sua localização.`);
          setLoading(false);
        });
      } else {
        setError('Geolocalização não suportada.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao detectar localização');
      setWeatherData(null);
      setLoading(false);
    }
  }, [addCityToHistory]);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  return {
    weatherData,
    loading,
    error,
    searchCity,
    history,
    selectCityFromHistory,
    currentLocation,
    detectLocation
  };
};
