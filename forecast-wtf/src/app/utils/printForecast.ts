import { CurrentWeather } from "../types/weatherTypes"

export const PrintForecast = (data: CurrentWeather): void => {
    window.print();
}