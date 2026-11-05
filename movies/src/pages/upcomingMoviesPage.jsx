import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api"
import AddToWatchList from '../components/cardIcons/addToWatchList'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorDisplay from "../components/errorDisplay";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

// Based on topRatedMoviesPage
const UpcomingMoviesPage = (props) => {
  // const { id, name } = useParams();

    const result = useQuery({
        // queryKey: ['topRatedMovies', { id: id }],
        queryKey: ['upcomingMovies'],
        queryFn: getUpcomingMovies,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`upcoming movies`} message={error.message} /> 
    }

    return (
        <MovieListTemplate
            title={`Upcoming Movies`}
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                        <AddToWatchList movie={movie} />
                    </>
                )
            }}
        />
    );
};
export default UpcomingMoviesPage;
