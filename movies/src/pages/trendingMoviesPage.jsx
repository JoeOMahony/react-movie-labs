import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getTrendingMovies } from "../api/tmdb-api"
import AddToWatchList from '../components/cardIcons/addToWatchList'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorDisplay from "../components/errorDisplay";

// Based on upcomingMoviesPage
const TrendingMoviesPage = (props) => {
    const result = useQuery({
        queryKey: ['trendingMovies'], // no need to pass anything
        queryFn: getTrendingMovies,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`trending movies`} message={error.message} /> 
    }

    return (
        <MovieListTemplate
            title={`Trending Movies`}
            movies={movies}
            action={(movie) => {
                return <AddToWatchList movie={movie} />
            }}
        />
    );
};
export default TrendingMoviesPage;
