import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { getMoviesByGenre } from "../api/tmdb-api"
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

// Based on favoriteMoviesPage.jsx
const GenreMoviesPage = (props) => {
    const { id, name } = useParams();

    const result = useQuery({
        queryKey: ['genreMovies', { id: id }],
        queryFn: getMoviesByGenre,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h3 style={{ color: 'red', fontWeight: 'bold' }}>Fetch error: {error.message}</h3>;
    }

    return (
        <MovieListTemplate
            title={`${name} Movies`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default GenreMoviesPage;
