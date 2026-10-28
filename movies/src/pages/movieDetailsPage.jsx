import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

const MoviePage = () => {
  const { id } = useParams();

  // Array Keys / Cache keys
  // Here the cache entry key is a serializable array contraining the values [“movie”, { id: xxxxx }].
  // See getMovie in src/api/tmdb-api.jsx
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  /* No need for a ternary anymore as isPending already handles waiting above */
  return (
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} />
    </PageTemplate>
  );
};

export default MoviePage;
