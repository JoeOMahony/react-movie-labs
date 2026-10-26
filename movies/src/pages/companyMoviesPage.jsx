import React, { useState, useEffect } from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { getMoviesByCompany } from "../api/tmdb-api"
import { useParams } from "react-router";

// Based on favoriteMoviesPage.jsx
const CompanyMoviesPage = (props) => {
    const [movies, setMovies] = useState([]);
    const { id, name } = useParams();

    useEffect(() => {
        getMoviesByCompany(id).then(movies => {
            setMovies(movies);
        });
    }, [id]);

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
