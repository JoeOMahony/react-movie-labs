import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { Link } from "react-router"
import popcornIcon from "../../images/popcorn-icon.png";
import { getCastByMovie } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import { getDirectorsByMovie } from "../../api/tmdb-api";
import Avatar from '@mui/material/Avatar';
import directorIcon from "../../images/director-board.png";
import personIcon from "../../images/person-icon.png";
import companyIcon from "../../images/company-icon.png";

let tmdbTinyImageUrl = 'https://image.tmdb.org/t/p/w92/';

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
  marginBottom: 1.5
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Getting cast members for a given movie
  const { data: cast = [] } = useQuery({
    queryKey: ["cast", { id: movie.id }],
    queryFn: getCastByMovie,
  });

  // Getting directors for a given movie
  const { data: directors = [] } = useQuery({
    queryKey: ["directors", { id: movie.id }],
    queryFn: getDirectorsByMovie,
  });

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mb: 2, mt: 1, fontWeight: 'bold' }}>
        Overview
      </Typography>

      <Typography variant="h6" component="p" sx={{ mb: 2 }}>
        {movie.overview}
      </Typography>

      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Link to={`/genres/${g.id}/${g.name}`}>
              <Chip label={g.name} sx={{ ...chip }} />
            </Link>
          </li>
        ))}
      </Paper>
  
      {/* Movie App Lab 02 Exercise 01: Production countries arr */}
      { movie.production_countries?.length > 0 && (
      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip 
          label={ movie.production_countries.length == 1 ? "Production Country" : "Production Countries" }
          sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((pCountry) => (
          <li key={pCountry.name}>
            <Link to={`/countries/${pCountry.iso_3166_1}/${pCountry.name}`}>
              { /* https://flagpedia.net/download/api */}
              <Chip label={pCountry.name} icon={<img src={`https://flagcdn.com/24x18/${pCountry.iso_3166_1.toLowerCase()}.png`} alt={pCountry.name} height="18" width="24" />} sx={{ ...chip }} />
            </Link>
          </li>
        ))}
      </Paper>
      )}

      {movie.production_companies?.length > 0 && (
        <Paper
          component="ul"
          sx={{ ...root }}
        >
          <li>
          <Chip 
          label={ movie.production_companies.length == 1 ? "Production Company" : "Production Companies" }
          sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_companies.map((pCompany) => (
          <li key={pCompany.name}>
            <Link to={`/companies/${pCompany.id}/${pCompany.name}`}>
              <Chip label={pCompany.name} sx={{ ...chip }} icon={<img src={pCompany.logo_path !== null ? tmdbTinyImageUrl + pCompany.logo_path : companyIcon} alt={pCompany.name} width="32" height="16" />} />
            </Link>
          </li>
        ))}
      </Paper>
      )}

      { directors?.length > 0 && (
      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip 
          label={ directors.length == 1 ? "Director" : "Directors"}
          sx={{ ...chip }} color="primary" />
        </li>
        {directors.map((director) => (
          <li key={director.id}>
            <Link to={`/directors/${director.id}/${director.name}`}>
              <Chip label={director.name} sx={{ ...chip }} 
              avatar={
                  <Avatar
                    src={director.profile_path !== null ? tmdbTinyImageUrl + director.profile_path : directorIcon}
                    alt={director.name}
                  />
                }/>
            </Link>
          </li>
        ))}
      </Paper>
      )}

      { cast?.length > 0 && (
      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip label="Cast Members" sx={{ ...chip }} color="primary" />
        </li>
        {cast.map((cm) => (
          <li key={cm.name}>
            <Link to={`/cast/${cm.id}/${cm.name}`}>
              <Chip label={cm.name} 
              avatar={
                  <Avatar
                    src={cm.profile_path !== null ? tmdbTinyImageUrl + cm.profile_path : personIcon}
                    alt={cm.name}
                  />
                }/>
            </Link>
          </li>
        ))}
      </Paper>
      )}

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />}
          label={`${movie.runtime} min.`}
          sx={{ "& .MuiChip-icon": { color: "secondary.main" } }}
        />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
          sx={{ "& .MuiChip-icon": { color: "money.main" } }}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={{ "& .MuiChip-icon": { color: "golden.main" } }}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

    </>
  );
};
export default MovieDetails;
