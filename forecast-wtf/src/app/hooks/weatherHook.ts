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

/**
 * Hook para lidar com dados, detecção de localização e histórico.
 */
export const useWeather = (): UseWeatherResult => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>(() => {
        // carrega historico
        const savedHistory = localStorage.getItem('weatherAppHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const [currentLocation, setCurrentLocation] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('weatherAppHistory', JSON.stringify(history));
    }, [history]);

    const addCityToHistory = useCallback((city: string) => {
        setHistory(prevHistory => {
            const newHistory = [city, ...prevHistory.filter(item => item.toLowerCase() !== city.toLowerCase())];
            return newHistory.slice(0, 5);
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
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationString = `${latitude},${longitude}`;
                    const data = await fetchWeatherData(locationString);
                    setWeatherData(data);
                    setCurrentLocation(data.currentWeather?.location.name || 'Localização desconhecida');
                    addCityToHistory(data.currentWeather?.location.name || 'Localização desconhecida');
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
            setError(err.message || 'Falha ao detectar localização ou capturar dados climáticos');
            setWeatherData(null);
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
