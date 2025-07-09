import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { DailyForecastDay } from "../types/weatherTypes";
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemperatureLineChartProps {
    forecast: DailyForecastDay[];
    loading: boolean;
    error: string | null;
}

export function TemperatureLineChart({ forecast, loading, error }: TemperatureLineChartProps) {
    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!forecast || forecast.length === 0) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Sem dados de temperatura...</div>;
    }

    const labels = forecast.map((day) => {
        const date = new Date(day.date);
        return `${date.getDate()}/${date.getMonth() + 1}`; 
    });

    const temperatures = forecast.map((day) => day.day.avgtemp_c);

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperatura Média (°C)',
                data: temperatures,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Temperatura Média - Últimos e Próximos 5 Dias',
            },
        },
    };

    return (
        <div className="p-4 bg-transparent rounded-xl w-full">
            <Line data={data} options={options} />
        </div>
    );
}
