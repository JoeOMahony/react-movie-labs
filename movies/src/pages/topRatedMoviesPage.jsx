import React, { useState, useEffect } from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api"
import AddToFavorites from '../components/cardIcons/addToFavorites'

const TopRatedMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getTopRatedMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <MovieListTemplate
      title='Top Rated Movies'
      movies={movies}
      action={(movie) => {
          return <AddToFavorites movie={movie} />
        }}
    />
  );
};
export default TopRatedMoviesPage;
