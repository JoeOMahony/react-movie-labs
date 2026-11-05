import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ErrorDisplay from "../components/errorDisplay"

const WriteReviewPage = () => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ['movie', { id: movieId }],
    queryFn: getMovie,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorDisplay resource={`add movie review`} message={error.message} />
  }

  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
