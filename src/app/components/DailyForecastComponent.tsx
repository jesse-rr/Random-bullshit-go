import type { DailyForecastDay } from "../types/weatherTypes";

interface DailyForecastProps {
    forecast: DailyForecastDay[];
    loading: boolean;
    error: string | null;
}

export function DailyForecastComponent({ forecast, loading, error }: DailyForecastProps) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Loading daily forecast...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!forecast || forecast.length === 0) {
        return <div className="text-center text-gray-600 dark:text-gray-300">No daily forecast available.</div>;
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-8 overflow-x-auto">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                Previsão próximos 5 dias
            </h3>
            <table className="w-[80%] mx-auto table-auto divide-y divide-gray-200 dark:divide-gray-600 text-center">
                <thead>
                    <tr>
                        {forecast.map((day, index) => {
                            const date = new Date(day.date);
                            const dayName = daysOfWeek[date.getDay()];
                            return (
                                <th
                                    key={index}
                                    className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                >
                                    {index === 0 ? 'Today' : dayName}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr>
                        {forecast.map((day, index) => (
                            <td key={index} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                <div className="flex justify-center items-center">
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8 mr-1" />
                                    {day.day.condition.text}
                                </div>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {forecast.map((day, index) => (
                            <td key={index} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                {day.day.avgtemp_c}°C
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
