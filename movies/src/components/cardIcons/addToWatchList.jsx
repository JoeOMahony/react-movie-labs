import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

// Based on addToFavorites.jsx
const AddToWatchList = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatchList = (e) => {
    e.preventDefault();
    context.addToWatchList(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToWatchList}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchList;