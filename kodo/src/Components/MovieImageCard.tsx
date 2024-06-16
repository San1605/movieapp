import { useCallback, useRef } from 'react';
import Player from "video.js/dist/types/player";
import VideoJS from '../Utils/VideoPlayer.tsx';

const MovieImageCard = ({ videoKey }: { videoKey: string | null }) => {
    const playerRef = useRef<Player | null>(null);

    const handleReady = useCallback((player: Player) => {
        playerRef.current = player;
    }, []);

    return (
        <div className='sm:h-[40%] lg:h-[75%] w-full border border-gray-700 rounded-lg shadow-lg overflow-hidden'>
            <VideoJS
                options={{
                    loop: true,
                    muted: true,
                    autoplay: true,
                    controls: false,
                    responsive: true,
                    fluid: true,
                    techOrder: ["youtube"],
                    aspectRatio: "16:9",
                    height: 220,
                    width: 220,
                    sources: [
                        {
                            type: "video/youtube",
                            src: `https://www.youtube.com/watch?v=${videoKey || "L3oOldViIgY"}`,
                        },
                    ],
                }}
                onReady={handleReady}
            />
        </div>
    );
};

export default MovieImageCard;
