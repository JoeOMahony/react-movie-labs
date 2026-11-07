import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { getMoviesByCountry } from "../api/tmdb-api"
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import ErrorDisplay from "../components/errorDisplay"
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'

// Based on favoriteMoviesPage.jsx
const CountryMoviesPage = () => {
    const { id, name } = useParams();

    const result = useQuery({
        queryKey: ['countryMovies', { id: id }],
        queryFn: getMoviesByCountry,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`movies from ${name}`} message={error.message} /> 
    }

    return (
        <MovieListTemplate
            title={`Movies from ${name}`}
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                        <AddToWatchListIcon movie={movie} />
                    </>
                )
            }}
        />
    );
};
export default CountryMoviesPage;
