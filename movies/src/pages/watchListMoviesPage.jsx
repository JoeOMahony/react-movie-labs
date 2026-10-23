import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchList from "../components/cardIcons/removeFromWatchListIcon";
import WriteReview from "../components/cardIcons/writeReview";

const WatchListMoviesPage = () => {
  const {myWatchList: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchListMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = watchListMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchListMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;
    // introducing the render prop
    return (
    <PageTemplate
      title="Watch List Movies"
      movies={movies}
      action={(movie) => {
        return (
          <> 
            <RemoveFromWatchList movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
  // The above code indicates that movie cards on the Favorite movies page should have two action icons:
  //  Remove from the Favorites and Write a Review. In the browser, try adding and removing favourites.
};

export default WatchListMoviesPage;
