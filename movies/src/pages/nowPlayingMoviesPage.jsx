import MovieListTemplate from '../components/templateMovieListPage'
import { getNowPlayingMovies } from "../api/tmdb-api"
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorDisplay from "../components/errorDisplay";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

// Based on topRatedMoviesPage
const NowPlayingMoviesPage = () => {
    // const { id, name } = useParams();

    const result = useQuery({
        // queryKey: ['topRatedMovies', { id: id }],
        queryKey: ['nowPlayingMovies'],
        queryFn: getNowPlayingMovies,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`now playing movies`} message={error.message} />
    }

    return (
        <MovieListTemplate
            title={`Now Playing`}
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                        <AddToWatchListIcon movie={movie} />
                    </>
                )}}
        />
    );
};
export default NowPlayingMoviesPage;
