'use client'

import { CurrentWeatherComponent } from "./components/CurrentWeatherComponent";
import { DailyForecastComponent } from "./components/DailyForecastComponent";
import { HourlyForecastComponent } from "./components/HourlyForecastComponent";
import { SearchComponent } from "./components/SearchComponent";
import { TemperatureLineChart } from "./components/TemperatureLineChart";
import { WeatherExtraDetailsComponent } from "./components/WeatherExtraDetailsComponent";
import { DraggableContainer } from "./components/DraggableContainer";
import { useWeather } from "./hooks/weatherHook";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Move, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ForecastImageChanger } from "./utils/forecastImageChanger";

export default function Home() {
  const { weatherData, loading, error, searchCity, history, selectCityFromHistory, currentLocation, detectLocation } = useWeather();
  const [selectedMode, setSelectedMode] = useState("dark");
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);
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

  const toggleFloatingPanel = () => {
    setShowFloatingPanel(!showFloatingPanel);
  };

  // Calculate initial position for floating panel
  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 100, y: 100 };
    return {
      x: Math.max(50, window.innerWidth - 450),
      y: 100
    };
  };

  return (
    <>
      <div 
        style={{
          backgroundImage: `url('${imgUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          
          {/* Fixed Controls */}
          <div className="fixed top-4 left-4 z-40 flex gap-2">
            <Button
              id="btn-mode"
              className="text-veryDarkBlueText bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-detail backdrop-blur-sm"
              onClick={handMode}
            >
              {selectedMode === "dark" ? (
                <span className="flex flex-row items-center gap-2">
                  <Sun className="dark:text-white text-veryDarkBlueText w-4 h-4" />
                  Light
                </span>
              ) : (
                <span id="sunIcon" className="flex flex-row items-center gap-2">
                  <Moon className="dark:text-white text-veryDarkBlueText w-4 h-4" />
                  Dark
                </span>
              )}
            </Button>
            
            <Button
              onClick={toggleFloatingPanel}
              className={`backdrop-blur-sm transition-all duration-200 ${
                showFloatingPanel 
                  ? 'bg-red-500/90 hover:bg-red-600 text-white' 
                  : 'bg-blue-500/90 hover:bg-blue-600 text-white'
              }`}
            >
              {showFloatingPanel ? (
                <span className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Fechar Painel
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Move className="w-4 h-4" />
                  Painel Flutuante
                </span>
              )}
            </Button>
          </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-start flex-grow p-6 pt-20">
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
        
        {/* Static Side Panel (when floating panel is hidden) */}
        {!showFloatingPanel && (
          <div className="flex flex-col items-center justify-start flex-shrink-0 p-6 w-full md:w-1/3 lg:w-1/4" id="dragme">
              <DailyForecastComponent
                  forecast={weatherData?.dailyForecast || []}
                  loading={loading}
                  error={error}
              />
              <TemperatureLineChart
                  forecast={weatherData?.dailyForecast || []}
                  loading={loading}
                  error={error}
              />
          </div>
        )}
      </div>

      {/* Floating Draggable Panel */}
      {showFloatingPanel && (
        <DraggableContainer 
          initialPosition={getInitialPosition()}
          title="Previsão do Tempo"
          className="w-96"
        >
          <div className="space-y-6">
            <DailyForecastComponent
                forecast={weatherData?.dailyForecast || []}
                loading={loading}
                error={error}
            />
            <TemperatureLineChart
                forecast={weatherData?.dailyForecast || []}
                loading={loading}
                error={error}
            />
          </div>
        </DraggableContainer>
      )}
    </>
  );
}