'use client'

import { CurrentWeatherComponent } from "./components/CurrentWeatherComponent";
import { DailyForecastComponent } from "./components/DailyForecastComponent";
import { HourlyForecastComponent } from "./components/HourlyForecastComponent";
import { SearchComponent } from "./components/SearchComponent";
import { WeatherExtraDetailsComponent } from "./components/WeatherExtraDetailsComponent";
import { useWeather } from "./hooks/weatherHook";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const { weatherData, loading, error, searchCity, history, selectCityFromHistory, currentLocation, detectLocation } = useWeather();
  const [selectedMode, setSelectedMode] = useState("dark");
  const { theme, setTheme } = useTheme();

  const handMode = () => {
    const html = document.getElementsByTagName("html");
    const currentMode = html[0].className;

    if (currentMode === "dark") {
      html[0].className = "light";
      setSelectedMode("light");
      setTheme("light");
    } else {
      html[0].className = "dark";
      setSelectedMode("dark");
      setTheme("dark");
    }
  };
  return (
    <div 
    style={{backgroundImage: "url('/desktop/rain.jpg')", backgroundSize: 'cover'}}
    className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Button
            id="btn-mode"
            className="text-veryDarkBlueText bg-transparent hover:bg-transparent text-detail
       dark:bg-darkBlueElements dark:text-whiteText hover:opacity-80"
            onClick={handMode}
          >
            {selectedMode === "dark" ? (
              <span className="flex flex-row items-center gap-3">
                <Sun className="dark:text-white text-veryDarkBlueText " />
                Light Mode
              </span>
            ) : (
              <span id="sunIcon" className="flex flex-row items-center gap-3">
                <Moon className="dark:text-white   text-veryDarkBlueText " />
                Dark Mode
              </span>
            )}
          </Button>
      <div className="flex flex-col items-center justify-start flex-grow p-6 ml-24 md:ml-0">
          <SearchComponent
              onSearch={searchCity}
              history={history}
              onSelectHistory={selectCityFromHistory}
              currentLocation={currentLocation}
              onDetectLocation={detectLocation}
              loading={loading}
          />
          <CurrentWeatherComponent
              data={weatherData?.currentWeather || null}
              loading={loading}
              error={error}
          />
          <HourlyForecastComponent
              forecast={weatherData?.hourlyForecast || []}
              loading={loading}
              error={error}
          />
          <WeatherExtraDetailsComponent
              data={weatherData?.currentWeather || null}
              loading={loading}
              error={error}
          />
      </div>
      <div className="flex flex-col items-center justify-start flex-shrink-0 p-6 w-full md:w-1/3 lg:w-1/4">
          <DailyForecastComponent
              forecast={weatherData?.dailyForecast || []}
              loading={loading}
              error={error}
          />
      </div>
    </div>
  );
}