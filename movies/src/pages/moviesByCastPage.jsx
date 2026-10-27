import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { getMoviesByCast } from "../api/tmdb-api"
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

const MoviesByCastPage = (props) => {
    const { castId, castName } = useParams();

    // No need to loop like favoriteMoviesPage as this page is for one cast member
    // I'm not destructuring as in lab provided code (movie reviews page) because I find it hard to keep track it all of at this stage
    const result = useQuery({
        queryKey: ['castMovies', { id: castId }],
        queryFn: getMoviesByCast,
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
            title={`Movies by ${castName}`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default MoviesByCastPage;
