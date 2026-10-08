import React, { useState, useEffect } from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api"

const UpcomingMoviesPage = (props) => {
  // Based on homePage.jsx, will keep favorites because it makes sense to be able to favourite a movie you want to see.
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

 useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <MovieListTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};
export default UpcomingMoviesPage;
