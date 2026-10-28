import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api"
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

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
        return <h3 style={{ color: 'red', fontWeight: 'bold' }}>Fetch error: {error.message}</h3>;
    }

    return (
        <MovieListTemplate
            title={`Top Rated Movies`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default TopRatedMoviesPage;
