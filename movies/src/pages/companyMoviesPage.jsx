import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { getMoviesByCompany } from "../api/tmdb-api"
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import ErrorDisplay from "../components/errorDisplay"

// Based on favoriteMoviesPage.jsx
const CompanyMoviesPage = () => {
    const { id, name } = useParams();

    const result = useQuery({
        queryKey: ['companyMovies', { id: id }],
        queryFn: getMoviesByCompany,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`movies by ${name}`} message={error.message} /> 
    }

    return (
        <MovieListTemplate
            title={`Movies by ${name}`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default CompanyMoviesPage;
