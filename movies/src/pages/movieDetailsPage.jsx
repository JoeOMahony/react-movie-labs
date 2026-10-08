import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";

const MoviePage = (props) => {
  const { id } = useParams();
  // Custom hooks allow us to extract component state logic into reusable functions. As an example, we will define a custom hook that manages a movie object state variable.
  const [movie] = useMovie(id);

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
