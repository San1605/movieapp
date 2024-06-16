import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import HomeImageCard from '../Components/HomeImageCard';
import GenreComponent from '../Components/GenreComponent';
import HomeMovieCard from '../Components/HomeMovieCard';
import Loader from "../Components/Loader";
import Error from '../Components/Error';
import NoDataFound from '../Components/NoDataFound';
import { genre, homeImageCardPropss, trail } from '../Utils/Interfaces.ts/home';
import { useGetApi } from '../Utils/Api/getApi';
import { GlobalContext } from '../Context/GlobalContext';

const Home = () => {
    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<number>(0);
    const [allMovies, setAllMovies] = useState<homeImageCardPropss[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const { query } = useContext(GlobalContext);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Fetch genres
    const { data: genres, loading: genresLoading, error: genresError } = useGetApi<genre[]>('genre/movie/list?language=en', (res: any) => res?.genres);

    // Fetch movies with pagination, genre filter, and search query
    const { data: movies, loading: moviesLoading, error: moviesError } = useGetApi<homeImageCardPropss[]>(
        `discover/movie?include_adult=false&include_video=true&with_origin_country=IN&language=en-US&page=${page}&with_genres=${selectedGenre || ''}&sort_by=popularity.desc`,
        (res: any) => res?.results,
        page
    );

    // Fetch trailer for the first movie
    const { data: trailer, loading: trailerLoading, error: trailerError } = useGetApi<trail[]>(
        `movie/${(movies && movies[0]?.id) ? movies[0]?.id : 784651}/videos?language=en-US`,
        (res: any) => res?.results,
    );

    useEffect(() => {
        if (movies) {
            setLoadingMore(false);
            if (page === 1) {
                setAllMovies(movies);
            } else {
                setAllMovies((prevMovies) => [...prevMovies, ...movies]);
            }
        }
    }, [movies]);

    // Reset page when selected genre changes
    useEffect(() => {
        setPage(1);
    }, [selectedGenre]);

    // Filter movies based on search query
    useEffect(() => {
        if (query) {
            const filteredMovies = allMovies.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
            setAllMovies(filteredMovies);
        } else {
            setPage(1);
        }
    }, [query]);

    // Scroll to the start of the current data when "Load More" is clicked
    useEffect(() => {
        if (loadMoreRef.current && !loadingMore && page > 1) {
            loadMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [allMovies, loadingMore, page]);

    const handleLoadMore = useCallback(() => {
        setLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
    }, []);

    if (genresLoading || moviesLoading || trailerLoading) {
        return <Loader />;
    }

    if (genresError || moviesError || trailerError) {
        return <Error />;
    }

    if (allMovies.length === 0 && !moviesLoading) {
        return <NoDataFound />;
    }

    return (
        <div className='h-full w-full flex flex-col overflow-y-auto relative'>
            {/* Header Section */}
            <div className='h-[75%] relative flex items-start justify-between px-4 shadow-lg'>
                <HomeImageCard videoKey={trailer ? trailer[0]?.key : null} />
            </div>

            {/* Genre Component Section */}
            <div className='px-4 py-6 shadow-md'>
                <GenreComponent genre={genres} setSelectedGenre={setSelectedGenre} />
            </div>

            {/* Movie Cards Section */}
            <div className='px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {allMovies.map((item, index) => (
                    <HomeMovieCard key={index} genress={genres} item={item} />
                ))}
            </div>

            {/* Load More Button */}
            {!loadingMore && (
                <div
                    ref={loadMoreRef}
                    onClick={handleLoadMore}
                    className='my-6 mx-auto px-4 py-2 text-white bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700'
                >
                    Load More
                </div>
            )}

            {/* Loading Spinner */}
            {loadingMore && (
                <div className="flex justify-center my-6">
                    <div className="w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default Home;