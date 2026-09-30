import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from '../components/movieCard'

const HomePage = (props) => {
  const movies = props.movies;
    
  return (
  <Grid container>
      <Grid size={12}>
          <h1> HomePage </h1>
      </Grid>
      <Grid size={3}>
        <MovieCard movie={movies[0]} />
      </Grid>
    </Grid>
  );
};
export default HomePage;
