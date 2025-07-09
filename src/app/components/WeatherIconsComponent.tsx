import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconType } from "../types/iconType";

export interface IconProps {
    icons: IconType[];
}

export function WeatherIconsComponent({ icons }: IconProps) {
    return (
        <div className='flex flex-col items-center justify-center space-y-4'>
            {icons.map((icon, index) => (
                <div key={index} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    onClick={icon.onClick}>
                    {typeof icon.src === 'string' ? (
                        <img
                            src={icon.src}
                            alt={icon.alt}
                            className={`w-6 h-6 ${icon.className}`} />
                    ) : (
                        <FontAwesomeIcon icon={icon.src} className={`w-6 h-6 ${icon.className}`} />
                    )}
                    {icon.label && <span className='text-xs mt-1'>{icon.label}</span>}
                </div>
            ))}
        </div>
    );
}