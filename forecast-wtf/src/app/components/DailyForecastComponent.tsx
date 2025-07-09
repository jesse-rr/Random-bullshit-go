'use client'

import type { DailyForecastDay } from "../types/weatherTypes";

interface DailyForecastProps {
    forecast: DailyForecastDay[];
    loading: boolean;
    error: string | null;
}

export function DailyForecastComponent({ forecast, loading, error }: DailyForecastProps) {
    if (loading) return <div className="text-center text-gray-800 dark:text-gray-200">Carregando...</div>;
    if (error) return <div className="text-center text-red-500">Erro: {error}</div>;
    if (!forecast?.length) return <div className="text-center text-gray-800 dark:text-gray-200">Previsão indisponível.</div>;
    
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
        <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                Previsão próximos 5 dias
            </h3>
            <table className="w-full divide-y divide-gray-200/50 dark:divide-gray-600/50">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Dia
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Condição
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Temp
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-gray-600/50">
                    {forecast.map((day, index) => {
                        const date = new Date(day.date);
                        const dayName = daysOfWeek[date.getDay()];
                        return (
                            <tr key={index} className="hover:bg-gray-100/50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 text-center">
                                    {index === 0 ? 'Hoje' : dayName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8 mr-2" />
                                        {day.day.condition.text}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
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