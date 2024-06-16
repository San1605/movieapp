import { useCallback, useRef } from 'react';
import Player from "video.js/dist/types/player";
import VideoJS from '../Utils/VideoPlayer.tsx';

const HomeImageCard = ({ videoKey }: { videoKey: string | null }) => {
    const playerRef = useRef<Player | null>(null);

    const handleReady = useCallback((player: Player) => {
        playerRef.current = player;
    }, []);

    return (
        <div className=' h-[100%] w-full  rounded-lg shadow-lg overflow-hidden'>
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
                            src: `https://www.youtube.com/watch?v=${videoKey}`,
                        },
                    ],
                }}
                onReady={handleReady}
            />
        </div>
    );
};

export default HomeImageCard;
