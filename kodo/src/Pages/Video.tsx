import { useCallback, useRef } from 'react';
import Player from "video.js/dist/types/player";
import VideoJS from '../Utils/VideoPlayer.tsx';
import { useParams } from 'react-router-dom';

const Video = () => {
    const { videoKey } = useParams();
    const playerRef = useRef<Player | null>(null);
    // const [isPlaying, setIsPlaying] = useState<boolean>(true);
    // const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const handleReady = useCallback((player: Player) => {
        playerRef.current = player;
    }, []);

    // const togglePlay = () => {
    //     if (playerRef.current) {
    //         if (isPlaying) {
    //             playerRef.current.pause();
    //         } else {
    //             playerRef.current.play();
    //         }
    //         setIsPlaying(!isPlaying);
    //     }
    // };

    // const toggleFullscreen = () => {
    //     if (playerRef.current) {
    //         if (!isFullscreen) {
    //             playerRef.current.requestFullscreen();
    //         } else {
    //             document.exitFullscreen();
    //         }
    //         setIsFullscreen(!isFullscreen);
    //     }
    // };

    return (
        <div className='relative w-full h-0 pb-[56.25%]'>
      <div className='absolute top-0 left-0 w-full h-full'>
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
    </div>
    );
}

export default Video;
