import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { DailyForecastDay } from "../types/weatherTypes";
import { useTheme } from "next-themes";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function TemperatureLineChart({ forecast, loading, error }: { forecast: DailyForecastDay[]; loading: boolean; error: string | null }) {
    const { theme } = useTheme();
    if (loading) return <div className="text-center text-gray-800 dark:text-gray-200">Carregando...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;
    if (!forecast?.length) return <div className="text-center text-gray-800 dark:text-gray-200">Sem dados de temperatura...</div>;
    const textColor = theme === 'dark' ? '#f3f4f6' : '#1f2937';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const borderColor = theme === 'dark' ? 'rgb(108, 223, 177)' : 'rgb(39, 67, 76)';
    const backgroundColor = theme === 'dark' ? 'rgba(110, 231, 183, 0.2)' : 'rgba(75, 192, 192, 0.2)';
    const data = {
        labels: forecast.map(day => `${new Date(day.date).getDate()}/${new Date(day.date).getMonth() + 1}`),
        datasets: [{
            label: 'Temperatura Média (°C)',
            data: forecast.map(day => day.day.avgtemp_c),
            fill: false,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            tension: .3,
            pointRadius: 6,
            pointHoverRadius: 8
        }],
    };
    return (
        <div className="w-full p-0">
            <Line 
                data={data} 
                options={{
                    responsive: true,
                    plugins: {
                        legend: { 
                            position: 'top', 
                            labels: { 
                                color: textColor,
                                font: { size: 18 }
                            } 
                        },
                        title: { 
                            display: true, 
                            text: 'Temperatura Média - Últimos e Próximos 5 Dias', 
                            color: textColor,
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 10, bottom: 30 }
                        }
                    },
                    scales: {
                        x: { 
                            ticks: { 
                                color: textColor,
                                font: { size: 12 }
                            },
                            grid: { color: gridColor }
                        },
                        y: { 
                            ticks: { 
                                color: textColor,
                                font: { size: 12 }
                            },
                            grid: { color: gridColor }
                        }
                    }
                }} 
            />
        </div>
    );
}