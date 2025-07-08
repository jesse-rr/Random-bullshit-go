'use client'

import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface SearchComponentProps {
    onSearch: (city: string) => void;
    history: string[];
    onSelectHistory: (city: string) => void;
    currentLocation: string | null;
    onDetectLocation: () => void;
    loading: boolean;
}

export function SearchComponent({ onSearch, history, onSelectHistory, currentLocation, onDetectLocation, loading }: SearchComponentProps) {
    const [city, setCity] = useState<string>('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <div className='flex flex-col items-center w-full max-w-lg mx-auto mb-8'>
            <form onSubmit={handleFormSubmit} className='flex w-full bg-white dark:bg-gray-700 rounded-full shadow-lg overflow-hidden'>
                <input
                    type='text'
                    className='flex-grow px-6 py-3 text-lg outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300'
                    placeholder='Digita sua cidade aqui'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={loading}
                />
                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-r-full transition-colors duration-200 flex items-center justify-center'
                    disabled={loading}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                </button>
            </form>

            {history.length > 0 && (
                <div className="w-full mt-4"> 
                    <h4 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">Recentes</h4>
                    <div className="flex flex-wrap min-h-1/8 justify-center gap-2">
                        {history.map((histCity, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectHistory(histCity)}
                                className="px-6 py-3 text-base bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 shadow-md mb-2"
                                disabled={loading}
                            >
                                {histCity}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <button
                onClick={onDetectLocation}
                className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors duration-200 flex items-center space-x-2"
                disabled={loading}
            >
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{loading && !currentLocation ? 'Detecting...' : currentLocation ? currentLocation : 'Detect My Location'}</span>
            </button>
        </div>
    );
}