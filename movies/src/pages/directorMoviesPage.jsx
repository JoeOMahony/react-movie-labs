import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { getMoviesByDirector } from "../api/tmdb-api"
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import ErrorDisplay from "../components/errorDisplay"

// Based on favoriteMoviesPage.jsx
const DirectorMoviesPage = (props) => {
    const { id, name } = useParams();

    const result = useQuery({
        queryKey: ['directorMovies', { id: id }],
        queryFn: getMoviesByDirector,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource="movies by director" message={error} />
    }

    return (
        <MovieListTemplate
            title={`Movies by ${name}`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default DirectorMoviesPage; 
