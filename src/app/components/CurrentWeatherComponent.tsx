import type { CurrentWeather } from "../types/weatherTypes";

interface CurrentWeatherProps {
    data: CurrentWeather | null;
    loading: boolean;
    error: string | null;
}

export function CurrentWeatherComponent({ data, loading, error }: CurrentWeatherProps) {
    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Loading current weather...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-center text-gray-600 dark:text-gray-300">No weather data available. Search for a city.</div>;
    }

    const { location, current } = data;

    return (
        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center flex-grow">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{location.name}, {location.country}</h1>
                <span className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">{current.temp_c}°C</span>
            </div>

            <div className="flex flex-col items-center flex-grow">
                <img src={current.condition.icon} alt={current.condition.text} className="w-24 h-24 mb-2" />
                <div className="text-2xl text-gray-700 dark:text-gray-200 capitalize">{current.condition.text}</div>
            </div>
        </div>
    );
}