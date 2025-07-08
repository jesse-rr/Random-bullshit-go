import { faCloudSunRain, faCog, faMagnifyingGlass, faMoon, faSun, faUser, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../hooks/themeContext";
import { WeatherIconsComponent } from "./WeatherIconsComponent";
import { IconType } from "../types/iconType";

export function AsideComponent() {
    const { toggleTheme, theme } = useTheme();

    const icons: IconType[] = [
        { src: faCloudSunRain, alt: 'Weather', className: 'text-2xl', label: 'Weather' },
        { src: faMagnifyingGlass, alt: 'Search', className: 'text-2xl', label: 'Search' },
        {
            src: theme === 'light' ? faMoon : faSun,
            alt: 'Theme',
            className: 'text-2xl',
            label: theme === 'light' ? 'Dark Mode' : 'Light Mode',
            onClick: toggleTheme
        },
        { src: faCog, alt: 'Settings', className: 'text-2xl', label: 'Settings' },
        { src: faUser, alt: 'Account', className: 'text-2xl', label: 'Account' },
    ];

    return (
        <aside className='flex flex-col items-center justify-between py-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-r-2xl h-full w-24 fixed left-0 top-0 z-10'>
            <FontAwesomeIcon icon={faWind} className='text-4xl text-blue-500 mb-8'></FontAwesomeIcon>
            <WeatherIconsComponent icons={icons} />
            <div className="h-10"></div>
        </aside>
    );
}