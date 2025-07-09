import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { HourlyForecastHour } from "../types/weatherTypes";

interface HourlyForecastProps {
    forecast: HourlyForecastHour[];
    loading: boolean;
    error: string | null;
}

export function HourlyForecastComponent({ forecast, loading, error }: HourlyForecastProps) {
    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Loading hourly forecast...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!forecast || forecast.length === 0) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Hourly forecast unavailable.</div>;
    }

    return (
        <div className="w-full">
            <h3 className='text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center'>Hourly Forecast</h3>
            <div className='flex overflow-x-auto pb-2 space-x-6 scrollbar-hide items-center'>
                {forecast.map((hour, index) => (
                    <div key={index} className='flex-shrink-0 flex flex-col items-center px-2 text-center'>
                        <div className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            {new Date(hour.time).getHours()}:00
                        </div>
                        <div className='mb-2'>
                            {hour.condition.icon ? (
                                <img src={hour.condition.icon} alt={hour.condition.text} className="w-10 h-10"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faCloudSunRain} className="w-10 h-10 text-gray-400" />
                            )}
                        </div>
                        <div className='text-lg font-semibold text-gray-800 dark:text-white'>
                            {hour.temp_c}°C
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}