'use client'

import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HourlyForecastHour } from "../types/weatherTypes";

interface HourlyForecastProps {
    forecast: HourlyForecastHour[];
    loading: boolean;
    error: string | null;
}

export function HourlyForecastComponent({ forecast, loading, error }: HourlyForecastProps) {
    if (loading) return <div className="flex items-center justify-center h-24 text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-24 text-red-500">Error: {error}</div>;
    if (!forecast || forecast.length === 0) return <div className="flex items-center justify-center h-24 text-gray-600 dark:text-gray-300">No data</div>;
    console.log(forecast[0])
    return (
        <div className="w-full flex justify-center">
            <div className="flex overflow-x-auto gap-2 scrollbar-hide items-center px-3 py-2">
                {forecast.map((hour) => (
                    
                    <div 
                        key={hour.time_epoch}
                        className="flex-shrink-0 flex flex-col items-center text-center w-[70px] h-[90px] p-2 rounded-lg shadow-sm"
                        >
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{new Date(hour.time).getHours()}:00</div>
                        <div className="mb-1">
                            {hour.condition.icon ? (
                                <img src={hour.condition.icon} alt={hour.condition.text} className="w-8 h-8" />
                            ) : (
                                <FontAwesomeIcon icon={faCloudSunRain} className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-white">{hour.temp_c}°C</div>
                    </div>
                ))}
            </div>
        </div>
    );
}