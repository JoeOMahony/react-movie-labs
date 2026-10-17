import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";   Redundant


const MoviePage = (props) => {
  const { id } = useParams();
  // Custom hooks allow us to extract component state logic into reusable functions. As an example, we will define a custom hook that manages a movie object state variable.
  // Array Keys / Cache keys
  // Here the cache entry key is a serializable array contraining the values [“movie”, { id: xxxxx }].
  // See getMovie in src/api/tmdb-api.jsx
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
