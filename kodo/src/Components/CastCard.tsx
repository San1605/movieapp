import React from 'react';
import { CastCardProps } from '../Utils/Interfaces.ts/home';



const CastCard: React.FC<CastCardProps> = (item) => {
  return (
    <div className='relative overflow-hidden rounded-lg shadow-lg bg-gradient-to-b from-gray-900 to-black cursor-pointer transition-all duration-300 h-[350px] min-w-[200px] flex flex-col hover:shadow-2xl hover:transform hover:scale-105'>
      {item?.profile_path && (
        <div className='relative h-[70%] w-full'>
          <img
            className='w-full h-full object-cover transition-transform duration-500 transform hover:scale-110 rounded-t-lg'
            src={`https://image.tmdb.org/t/p/w500${item?.profile_path}`}
            alt={item?.name}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
        </div>
      )}
      <div className='relative flex-grow flex flex-col justify-center gap-1 p-4 text-white text-center'>
        <span className='font-bold text-xl tracking-wider'>{item?.original_name}</span>
        <span className='text-sm text-gray-400'>{item?.character}</span>
      </div>
    </div>
  );
};

export default CastCard;