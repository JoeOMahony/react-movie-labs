import React, { useState, useEffect } from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api"
import AddToWatchList from '../components/cardIcons/addToWatchList'

const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <MovieListTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
          return <AddToWatchList movie={movie} />
        }}
    />
  );
};
export default UpcomingMoviesPage;
