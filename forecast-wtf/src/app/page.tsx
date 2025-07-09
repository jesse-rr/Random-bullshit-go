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
import { faLocationDot, faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { weatherData, loading, error, searchCity, history, selectCityFromHistory, currentLocation, detectLocation } = useWeather();
  const { setTheme } = useTheme();
  const [selectedMode, setSelectedMode] = useState("dark");
  const [currentImgUrl, setCurrentImgUrl] = useState('/desktop/default.jpg');
  const [nextImgUrl, setNextImgUrl] = useState('');
  const [fade, setFade] = useState(false);

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
      const newImgUrl = ForecastImageChanger(
        weatherData.currentWeather.current.condition.code, 
        weatherData.currentWeather.current.is_day
      );
      if (newImgUrl !== currentImgUrl) {
        const img = new Image();
        img.src = newImgUrl;
        img.onload = () => {
          setNextImgUrl(newImgUrl);
          setFade(true);
          setTimeout(() => {
            setCurrentImgUrl(newImgUrl);
            setFade(false);
          },180);
        };
      }
    }
  }, [weatherData]);

  function printLocation(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden h-screen">
      <div 
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          backgroundImage: `url('${currentImgUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: fade ? 0 : 1,
        }}
      />
      <div 
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          backgroundImage: `url('${nextImgUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: fade ? 1 : 0,
        }}
      />
      <div className="relative z-10 flex flex-col md:flex-row h-full">
        <div className="pt-6 pl-6 z-50 flex flex-col gap-3 md:absolute">
          <Button
            id="btn-mode"
            variant="outline"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 h-9 px-4 shadow-sm hover:bg-white dark:hover:bg-gray-700 shadow-xl shadow-black/30"
            onClick={handMode}
          >
            {selectedMode === "dark" ? (
              <>
                <Sun className="h-3.5 w-3.5" />
                <span className="ml-2">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" />
                <span className="ml-2">Dark Mode</span>
              </>
            )}
          </Button>
          <Button
            onClick={printLocation}
            variant="outline"
            size="sm"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 h-9 px-4 shadow-sm hover:bg-white dark:hover:bg-gray-700 shadow-xl shadow-black/30"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faPrint} className="h-3.5 w-3.5" />
            <span className="ml-2">Imprimir</span>
          </Button>
          <Button
            onClick={detectLocation}
            variant="outline"
            size="sm"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 h-9 px-4 shadow-sm hover:bg-white dark:hover:bg-gray-700 shadow-xl shadow-black/30"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5" />
            <span className="ml-2">
              {loading && !currentLocation ? 'Detecting...' : currentLocation ? currentLocation : 'My Location'}
            </span>
          </Button>
        </div>
        <div className="flex-1 flex flex-col pt-6 px-8 overflow-y-auto md:ml-20">
          <div className="w-full max-w-4xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 mx-auto shadow-xl shadow-black/30">
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
          <div className="flex-1 overflow-y-auto backdrop-blur-md bg-white/60 dark:bg-gray-800/60 shadow-sm p-8 mb-5 mr-2 rounded-xl shadow-xl shadow-black">
            <div className="space-y-10 flex flex-col gap-4 h-full mb-90">
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
    </div>
  );
}