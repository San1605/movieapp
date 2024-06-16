import React from 'react';
import { GenreProps } from '../Utils/Interfaces.ts/home';



const GenreComponent: React.FC<GenreProps> = ({ genre, setSelectedGenre }) => {
    return (
        <div className='flex flex-wrap gap-3 p-2 rounded-lg items-center justify-center'>
            {genre?.map((item) => (
                <div
                    onClick={() => { if (setSelectedGenre) setSelectedGenre(item?.id) }}
                    key={item?.id}
                    className="relative px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full text-[14px] font-medium whitespace-nowrap shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-105 animate-fade-in"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full blur-sm opacity-50"></div>
                    <div className="relative z-10">{item?.name}</div>
                </div>
            ))}
        </div>
    );
}

export default GenreComponent;
