import React from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api"
import AddToWatchList from '../components/cardIcons/addToWatchList'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

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
        return <h3 style={{ color: 'red', fontWeight: 'bold' }}>Fetch error: {error.message}</h3>;
    }

    return (
        <MovieListTemplate
            title={`Upcoming Movies`}
            movies={movies}
            action={(movie) => {
                return <AddToWatchList movie={movie} />
            }}
        />
    );
};
export default UpcomingMoviesPage;
