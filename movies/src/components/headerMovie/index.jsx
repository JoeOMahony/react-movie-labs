import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 1.5,
        margin: 0,
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3" sx={{ typography: 'movieTitleFont' }} >
        {movie.title}
        <a href={movie.homepage}>
          <LinkIcon color="primary" sx={{ paddingLeft: "1rem" }} />
        </a>
        <br />
        { /* Console error fix for: "In HTML, <h4> cannot be a child of <h3>. This will cause a hydration error." */ }
        <Typography variant="h4" component="p" sx={{ typography: 'movieTaglineFont', fontSize: "2rem"}} >
          {movie.tagline && (
            <span>{`   "${movie.tagline}"`} </span>
          )}
        </Typography>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)} >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
