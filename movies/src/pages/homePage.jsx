import React, { useState, useEffect } from "react";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Header from '../components/headerMovieList';
import FilterCard from "../components/filterMoviesCard";

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const genreId = Number(genreFilter)

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  }

  const addToFavorites = (movieId) => {
   const updatedMovies = movies.map((m) => 
      m.id === movieId ? {...m, favorite: true } : m
  );
  setMovies(updatedMovies)
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid key="find" size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} sx={{ padding: "20px" }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList movies={displayedMovies} selectFavorite={addToFavorites}></MovieList>
      </Grid>
    </Grid>
  );
};
export default HomePage;
