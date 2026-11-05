import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-brunorock-popcorn.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import ErrorDisplay from "../errorDisplay";
import InputAdornment from '@mui/material/InputAdornment';
import StarIcon from '@mui/icons-material/Star';

const formControl =
{
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorDisplay resource={`filter movies`} message={error.message} />
  }
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleChange(e, "rating", e.target.value);
  };

  return (
    <Card
      sx={{
        backgroundColor: "tertiary.main"
      }}
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="medium" sx={{ pr: 1 }} />
          Filter movies
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        { /* https://mui.com/material-ui/react-text-field/
        https://mui.com/material-ui/material-icons/?query=star */ }
        <TextField
          sx={{ ...formControl }}
          id="rating-filter"
          label="Minimum rating"
          type="number"
          variant="filled"
          value={props.ratingFilter}
          onChange={handleRatingChange}
          slotProps={{
            htmlInput: { min: 0, max: 10 },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <StarIcon />
                </InputAdornment>
              )
            }
          }}
          error={props.ratingFilter < 0 || props.ratingFilter > 10}
        />
      </CardContent>
      <CardMedia
        sx={{ height: 300, m: 1, mb: 3, borderRadius: 2.5 }}
        image={img}
        title="Filter"
      />
      {/* <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent> */}
    </Card>
  );
}
