// HomeMovieCard.tsx
import React from 'react';
import { homeImageCardProps } from '../Utils/Interfaces.ts/home';
import { useNavigate } from 'react-router-dom';

const HomeMovieCard: React.FC<homeImageCardProps> = ({ item, genress }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`movie/${item?.id}`)}
      className='relative overflow-hidden rounded-lg shadow-lg bg-black cursor-pointer transition-all duration-300 flex flex-col hover:shadow-2xl hover:transform hover:scale-105 sm:h-[400px] sm:w-[300px]'
    >
      <div className='relative h-[60%] w-full'>
        <img
          className='w-full h-full object-cover transition-transform duration-500 transform hover:scale-110'
          src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
      </div>
      <div className='relative flex-grow flex flex-col justify-between p-4 text-white'>
        <span className='font-bold text-xl tracking-wider truncate'>{item?.title}</span>
        <div className='text-sm text-gray-400'>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{item?.release_date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{item?.vote_average}</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 mt-2'>
          {genress?.filter((ele) => item?.genre_ids?.includes(ele?.id))
            ?.map((elem) => (
              <span
                key={elem?.id}
                className='px-2 py-1 rounded-full bg-gray-800 text-white text-xs uppercase tracking-wider border border-gray-600'
              >
                {elem?.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMovieCard;