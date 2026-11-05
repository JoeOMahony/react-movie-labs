import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import ErrorDisplay from "../components/errorDisplay";

const HomePage = () => {
  /* 
    The useQuery hook uses the second argument (tmdb-api.jsx --> getMovies()) to perform the HTTP request; 
    the first argument is the cache entry key.
  */
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorDisplay resource={`movies`} message={error.message} />
  }

  const movies = data.results;

  // // Redundant, but necessary to avoid app crashing.
  // const favorites = movies.filter(m => m.favorite)
  // localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      // Render prop for the "favourite" icon
      // The render prop’s function returns the icon to display in movie cards on the home page.
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchListIcon movie={movie} />
          </>
        )
      }}
    />
  );
};

export default HomePage;
