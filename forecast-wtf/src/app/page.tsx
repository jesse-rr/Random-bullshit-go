'use client'

import { CurrentWeatherComponent } from "./components/CurrentWeatherComponent";
import { DailyForecastComponent } from "./components/DailyForecastComponent";
import { HourlyForecastComponent } from "./components/HourlyForecastComponent";
import { SearchComponent } from "./components/SearchComponent";
import { TemperatureLineChart } from "./components/TemperatureLineChart";
import { WeatherExtraDetailsComponent } from "./components/WeatherExtraDetailsComponent";
import { useWeather } from "./hooks/weatherHook";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ForecastImageChanger } from "./utils/forecastImageChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { weatherData, loading, error, searchCity, history, selectCityFromHistory, currentLocation, detectLocation } = useWeather();
  const [selectedMode, setSelectedMode] = useState("dark");
  const [imgUrl, setImgUrl] = useState('/desktop/default.jpg');
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

  useEffect(() => {
    if (weatherData?.currentWeather) {
      const newImgUrl = ForecastImageChanger(weatherData.currentWeather.current.condition.code, weatherData.currentWeather.current.is_day);
      setImgUrl(`${newImgUrl}`);
    }
  }, [weatherData]);

  return (
    <div 
      style={{ 
        backgroundImage: `url('${imgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh'
      }}
      className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 relative"
    >
      <div className="pt-6 pl-6 z-50 flex flex-col gap-3 md:absolute">
        <Button
          id="btn-mode"
          variant="outline"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 h-9 px-4 shadow-sm hover:bg-white dark:hover:bg-gray-700"
          onClick={handMode}
        >
          {selectedMode === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              <span className="ml-2">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              <span className="ml-2">Dark Mode</span>
            </>
          )}
        </Button>
        <Button
          onClick={detectLocation}
          variant="outline"
          size="sm"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 h-9 px-4 shadow-sm hover:bg-white dark:hover:bg-gray-700"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5" />
          <span className="ml-2">
            {loading && !currentLocation ? 'Detecting...' : currentLocation ? currentLocation : 'My Location'}
          </span>
        </Button>
      </div>
      <div className="flex-1 flex flex-col pt-6 px-8 overflow-y-auto md:ml-20">
        <div className="w-full max-w-4xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 mx-auto">
          <HourlyForecastComponent
            forecast={weatherData?.hourlyForecast || []}
            loading={loading}
            error={error}
          />
        </div>
        <div className="w-full max-w-4xl mx-auto mt-6">
          <CurrentWeatherComponent
            data={weatherData?.currentWeather || null}
            loading={loading}
            error={error}
          />
        </div>
      </div>
      <div className="w-full md:w-[34%] lg:w-[34%] h-full flex flex-col pt-6 relative">
        <div className="flex-1 overflow-y-auto backdrop-blur-md bg-white/60 dark:bg-gray-800/60 shadow-sm p-8 mb-5 mr-2 rounded-xl">
          <div className="space-y-10 flex flex-col gap-4 h-full">
            <SearchComponent
              onSearch={searchCity}
              history={history}
              onSelectHistory={selectCityFromHistory}
              currentLocation={currentLocation}
              onDetectLocation={detectLocation}
              loading={loading}
            />
            <DailyForecastComponent
              forecast={weatherData?.dailyForecast || []}
              loading={loading}
              error={error}
            />
            <WeatherExtraDetailsComponent
              data={weatherData?.currentWeather || null}
              loading={loading}
              error={error}
            />
            <TemperatureLineChart
              forecast={weatherData?.dailyForecast || []}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}