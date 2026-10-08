import React from "react";
import MovieCard from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  let movieCards = props.movies.map((m) => (
    <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
      <MovieCard key={m.id} movie={m} selectFavorite={props.selectFavorite} />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;