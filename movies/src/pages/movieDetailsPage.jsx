import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import MovieHeader from "../components/headerMovie/index.jsx";
import MovieDetails from "../components/movieDetails/index.jsx";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const MoviePage = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);

  // (1). Get the full details on the film
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((movie) => {
        // console.log(movie)
        setMovie(movie);
      });
  }, [id]);

  // (2). Get the images for that same film 
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters)
      .then((images) => {
        // console.log(images)
        setImages(images);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {movie ? (
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid size={{ xs: 3 }}>
              <div sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}>
                <ImageList
                  sx={{
                    height: "100vh",
                  }}
                  cols={1}
                >
                  {images.map((image) => (
                    <ImageListItem
                      key={image.file_path}
                      cols={1}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.file_path}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>

              </div>
            </Grid>
            <Grid size={{ xs: 9 }}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
