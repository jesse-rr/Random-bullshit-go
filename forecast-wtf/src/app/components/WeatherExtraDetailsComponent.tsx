import type { CurrentWeather } from "../types/weatherTypes";

interface WeatherExtraDetailsProps {
    data: CurrentWeather | null;
    loading: boolean;
    error: string | null;
}

export function WeatherExtraDetailsComponent({ data, loading, error }: WeatherExtraDetailsProps) {
    if (loading) return <div className="text-center text-gray-800 dark:text-gray-200">Loading extra details...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;
    if (!data) return <div className="text-center text-gray-800 dark:text-gray-200">No extra details available.</div>;

    const { current } = data;
    const details = [
        { label: 'Sensação térmica', value: `${current.feelslike_c}°C` },
        { label: 'Humidade', value: `${current.humidity}%` },
        { label: 'Velocidade dos ventos', value: `${current.wind_kph} km/h` },
        { label: 'Índice de UV', value: `${current.uv}` },
    ];

    return (
        <div className="w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Detalhes Adicionais</h3>
            <div className="space-y-3">
                {details.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}