import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

// displays review extracts in a table layout,
export default function MovieReviews({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { id: movie.id }],
    queryFn: getMovieReviews,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const reviews = data.results;

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell >{excerpt(r.content)}</TableCell>
              <TableCell >
              <Link
                  to={`/reviews/${r.id}`}
                  state={{
                      review: r,
                      movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
