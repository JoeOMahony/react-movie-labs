import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getNowPlayingMovies } from "../api/tmdb-api"
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

// Based on topRatedMoviesPage
const NowPlayingMoviesPage = (props) => {
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
        return <h3 style={{ color: 'red', fontWeight: 'bold' }}>Fetch error: {error.message}</h3>;
    }

    return (
        <MovieListTemplate
            title={`Now Playing`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default NowPlayingMoviesPage;
