import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";

// The icon/Link routes the app to the URL ‘/reviews/form’ and passes the movie’s id as part of the link’s state.
const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`}
      state={{
          movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
