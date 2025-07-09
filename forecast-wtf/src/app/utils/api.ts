import type { CurrentWeather, DailyForecastDay, HourlyForecastHour, WeatherData } from "../types/weatherTypes";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
        const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || `Erro na resposta da API: ${response.status}`);
        }
        const data = await response.json();

        const currentWeather: CurrentWeather = {
            location: data.location,
            current: data.current,
        };

        const dailyForecast: DailyForecastDay[] = data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            date_epoch: day.date_epoch,
            day: day.day,
            astro: day.astro,
            hour: day.hour,
        }));

        const allHours: HourlyForecastHour[] = [];
        data.forecast.forecastday.forEach((day: DailyForecastDay) => {
            allHours.push(...day.hour);
        });

        const hourlyForecast: HourlyForecastHour[] = allHours.filter((hour: HourlyForecastHour) => {
            const hourDateTime = new Date(hour.time).getTime();
            const currentDateTime = new Date().getTime();
            return hourDateTime >= currentDateTime;
        }).slice(0, 12);

        return { currentWeather, dailyForecast, hourlyForecast };
    } catch (error) {
        console.error('Erro ao capturar dados:', error);
        throw error;
    }
};