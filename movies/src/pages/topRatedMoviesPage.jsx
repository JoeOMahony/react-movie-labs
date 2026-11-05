import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api"
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorDisplay from "../components/errorDisplay";
import AddToWatchList from "../components/cardIcons/addToWatchList";
import AddToWatchListIcon from '../components/cardIcons/addToWatchList';

const TopRatedMoviesPage = (props) => {
  // const { id, name } = useParams();

    const result = useQuery({
        // queryKey: ['topRatedMovies', { id: id }],
        queryKey: ['topRatedMovies'],
        queryFn: getTopRatedMovies,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`top rated movies`} message={error.message} /> 
    }

    return (
        <MovieListTemplate
            title={`Top Rated Movies`}
            movies={movies}
            action={(movie) => {
                return (
                    <>
                    <AddToFavorites movie={movie} />
                    <AddToWatchListIcon movie={movie} />
                    </>
                )
                
            }}
        />
    );
};
export default TopRatedMoviesPage;
