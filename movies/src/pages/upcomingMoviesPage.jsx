import React, { useState, useEffect } from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api"
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const UpcomingMoviesPage = (props) => {
  // Based on homePage.jsx, will keep favorites because it makes sense to be able to favourite a movie you want to see.
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

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
          return <AddToFavoritesIcon movie={movie} />
        }}
    />
  );
};
export default UpcomingMoviesPage;
