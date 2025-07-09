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
    const localTime = new Date(location.localtime);

    return (
        <div className="absolute bottom-8 left-8 text-white dark:text-white drop-shadow-lg">
            <div className="flex items-end gap-4">
            <div className="flex items-start">
                <span className="text-8xl font-bold leading-none">{current.temp_c}</span>
                <span className="text-4xl self-start mt-1">°C</span>
            </div>            
                <div className="flex flex-col">
                    <div className="text-5xl font-semibold">
                        {location.name}
                    </div>
                    <div className="text-2x1 opacity-80">
                        {location.country} - {localTime.toLocaleDateString()} • {localTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <img 
                        src={current.condition.icon} 
                        alt={current.condition.text} 
                        className="w-18 h-18"
                    />
                    <div className="text-sm capitalize">{current.condition.text}</div>
                </div>
            </div>
        </div>
    );
}