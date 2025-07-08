import { faSun, faTemperatureHalf, faTint, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CurrentWeather } from "../types/weatherTypes";

interface WeatherExtraDetailsProps {
    data: CurrentWeather | null;
    loading: boolean;
    error: string | null;
}

export function WeatherExtraDetailsComponent({ data, loading, error }: WeatherExtraDetailsProps) {
    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Loading extra details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-center text-gray-600 dark:text-gray-300">No extra details available.</div>;
    }

    const { current } = data;

    const details = [
        { label: 'Real Feel', value: `${current.feelslike_c}°C`, icon: faTemperatureHalf },
        { label: 'Humidity', value: `${current.humidity}%`, icon: faTint },
        { label: 'Wind', value: `${current.wind_kph} km/h`, icon: faWind },
        { label: 'UV Index', value: `${current.uv}`, icon: faSun },
    ];

    return (
        <div
            className='grid grid-cols-2 gap-4 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-3/4 mx-auto mt-8'
        >
            {details.map((item, index) => (
                <div key={index} className="flex justify-center">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm w-48 justify-center"> {/* Adicionado justify-center aqui */}
                        <FontAwesomeIcon icon={item.icon} className="text-blue-500 dark:text-blue-400 text-2xl" />
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                            <span className="text-lg font-semibold text-gray-800 dark:text-white">{item.value}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}