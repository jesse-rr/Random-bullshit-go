'use client'

import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
        <div className='flex flex-col w-full gap-4'>
            <form onSubmit={handleFormSubmit} className='flex w-full border-b-2 border-gray-600 dark:border-gray-500 pb-2'>
                <input
                    type='text'
                    className='flex-grow px-3 py-2 text-lg outline-none bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400'
                    placeholder='Search for a city...'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={loading}
                />
                <Button
                    type='submit'
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-300 hover:bg-transparent hover:text-gray-800 dark:hover:text-gray-200"
                    disabled={loading}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
                </Button>
            </form>
            {history.length > 0 && (
                <div className="w-full">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Recent searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {history.map((histCity, index) => (
                            <Button
                                key={index}
                                onClick={() => onSelectHistory(histCity)}
                                variant="outline"
                                size="sm"
                                className="text-sm px-3 py-1 h-auto rounded-md border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                disabled={loading}
                            >
                                {histCity}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}