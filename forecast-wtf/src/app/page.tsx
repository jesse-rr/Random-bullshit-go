import { AsideComponent } from "./components/AsideComponent";
import { CurrentWeatherComponent } from "./components/CurrentWeatherComponent";
import { DailyForecastComponent } from "./components/DailyForecastComponent";
import { HourlyForecastComponent } from "./components/HourlyForecastComponent";
import { SearchComponent } from "./components/SearchComponent";
import { WeatherExtraDetailsComponent } from "./components/WeatherExtraDetailsComponent";
import { useWeather } from "./hooks/weatherHook";

export default function Home() {
  const { weatherData, loading, error, searchCity, history, selectCityFromHistory, currentLocation, detectLocation } = useWeather();
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <AsideComponent />
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