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
        return <div className="text-center text-gray-600 dark:text-gray-300">Carregando previsão horária...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!forecast || forecast.length === 0) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Previsão horária indisponível.</div>;
    }

    return (
        <div className='p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-3/4 h-1/4 mx-auto mt-8 flex flex-col justify-between'>
            <h3 className='text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center'>Previsão horária</h3>
            <div className='flex overflow-x-auto pb-4 space-x-4 scrollbar-hide items-center flex-grow justify-between'>
                {forecast.map((hour, index) => (
                    <div key={index} className='flex-shrink-0 flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm text-center min-w-[80px]'>
                        <div className='text-sm text-gray-700 dark:text-gray-300 mb-1'>{new Date(hour.time).getHours()}:00</div>
                        {hour.condition.icon ? (
                            <img
                                src={hour.condition.icon}
                                alt={hour.condition.text}
                                className={"w-10 h-10 mb-1"}
                            />
                        ) : (
                            <FontAwesomeIcon icon={faCloudSunRain} className="w-10 h-10 text-gray-400 mb-1" />
                        )}
                        <div className='text-lg font-medium text-gray-800 dark:text-white'>{hour.temp_c}°C</div>
                    </div>
                ))}
            </div>
        </div>
    );
}