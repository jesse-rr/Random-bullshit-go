@@ .. @@
 import { CurrentWeatherComponent } from "./components/CurrentWeatherComponent";
 import { DailyForecastComponent } from "./components/DailyForecastComponent";
 import { HourlyForecastComponent } from "./components/HourlyForecastComponent";
 import { SearchComponent } from "./components/SearchComponent";
+import { ThemeToggle } from "./components/ThemeToggle";
 import { WeatherExtraDetailsComponent } from "./components/WeatherExtraDetailsComponent";
 import { useWeather } from "./hooks/weatherHook";

 export default function Home() {
   const { weatherData, loading, error, searchCity, history, selectCityFromHistory, currentLocation, detectLocation } = useWeather();
   return (
-    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
+    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
+      <ThemeToggle />
       <div className="flex flex-col items-center justify-start flex-grow p-6 ml-24 md:ml-0">
           <SearchComponent
               onSearch={searchCity}