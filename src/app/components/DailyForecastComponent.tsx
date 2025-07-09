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
        <div className="h-auto p-4 bg-transparent rounded-xl w-full">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Previsão próximos 5 dias</h3>
            <table className="h-48 w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider rounded-tl-lg">Day</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Condition</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider rounded-tr-lg">Temp</th>
                    </tr>
                </thead>
                <tbody className="h-full bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                    {forecast.map((day, index) => {
                        const date = new Date(day.date);
                        const dayName = daysOfWeek[date.getDay()];
                        return (
                            <tr key={index} className="h-20 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white align-middle text-center">
                                    {index === 0 ? 'Today' : dayName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 align-middle text-center">
                                    <div className="flex items-center justify-center h-full">
                                        <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8 mr-2" />
                                        {day.day.condition.text}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 align-middle text-center">
                                    {day.day.avgtemp_c}°C
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
