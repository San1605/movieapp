import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trailer } from '../Utils/Interfaces.ts/home';



const Trailer: React.FC<trailer> = ({ trailer, setVideoKey }) => {
    const navigate = useNavigate();

    return (
        <div className='flex gap-4 mt-4'>
            {trailer?.slice(0, 2)?.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        if (setVideoKey)
                            setVideoKey(item?.key);
                        navigate(`/video/${item?.key}`);
                    }}
                    className='px-4 py-2 bg-gray-800 text-white rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-gray-700 hover:text-gray-200'
                >
                    Watch {item?.type}
                </button>
            ))}
        </div>
    );
}

export default Trailer;
