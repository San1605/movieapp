import { useState } from 'react'
// import { movie } from '../Utils/Hooks/GetMovies'
import GenreComponent from '../Components/GenreComponent'
import CastCard from '../Components/CastCard'
import Trailer from '../Components/Trailer'
import MovieImageCard from '../Components/MovieImageCard'
import { useGetApi } from '../Utils/Api/getApi'
import { CastMember, Movie, trail } from '../Utils/Interfaces.ts/home'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import Error from '../Components/Error'

const MovieDetail = () => {
    const [videoKey, setVideoKey] = useState<string | null>(null)
    const { id } = useParams()
    console.log(videoKey)
    const { data: movie, loading: movieLoading, error: movieError } = useGetApi<Movie>(`movie/${id}`, (res) => (res as any));
    const { data: trailer, loading: trailerLoading, error: trailerError } = useGetApi<trail[]>(`movie/${movie ? movie?.id : 784651}/videos?language=en-US`, (res) => (res as any)?.results);
    const { data: actors, loading: actorsLoading, error: actorsError } = useGetApi<CastMember[]>(`/movie/${movie ? movie?.id : 784651}/credits?&language`, (res) => (res as any)?.cast);

    if (movieLoading || trailerLoading || actorsLoading) {
        return <Loader />
    }

    if (movieError || trailerError || actorsError) {
        return <Error />
    }

    return (
        <div className='relative flex flex-col h-full w-full bg-black border border-black overflow-y-auto '>
            {/* Image Card */}
            <MovieImageCard videoKey={trailer ? trailer[0]?.key : null} />

            {/* Details Section */}
            <div className='absolute top-[30%] lg:top-[77%] w-full  bg-opacity-75 p-6 rounded-t-lg'>
                {/* Movie Title */}
                <div className='text-white text-2xl font-bold mb-2'>{movie?.title}</div>

                {/* Movie Overview */}
                <div className='text-gray-300 text-sm mb-4'>{movie?.overview}</div>

                {/* Release Date */}
                <div className='text-gray-400 text-sm mb-4'>Release date: {movie?.release_date}</div>

                {/* Genre Component */}
                <GenreComponent genre={movie?.genres || []} />

                {/* Actors Section */}
                <div className='w-full flex flex-row gap-3 overflow-x-auto py-4'>
                    {actors?.map((item) => (
                        <CastCard key={item.id} {...item} />
                    ))}
                </div>

                {/* Trailer Section */}
                <Trailer trailer={trailer || []} setVideoKey={setVideoKey} />
            </div>
        </div>

    )
}

export default MovieDetail
