import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{
              backgroundColor: "primary.main",
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                transform: 'scale(1.05)',
                transition: 'transform 1s ease-in-out',
              }
            }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" sx={{ typography: 'movieTitleFont' }}>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }} >
              <Typography variant="h6" component="p">
                <StarRateIcon fontSize="small" sx={{ color: "golden.main" }} />
                {"  "} {Math.round(movie.vote_average * 10) / 10}{" "}
              </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>

        {action(movie)}

        {/* https://mui.com/material-ui/react-button/ 
            Aligns more info button to the right of faourite */}
        <Link to={`/movies/${movie.id}`} style={{ marginLeft: 'auto' }}>
          <Button variant="outlined" size="medium" color="primary" sx={{
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.95)',
              textDecoration: 'underline',
            }
          }}>
            More Info...
          </Button>
        </Link>

      </CardActions>
    </Card>
  );
}
