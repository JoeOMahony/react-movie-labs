import React, { useState, useEffect } from "react";
import MovieListTemplate from '../components/templateMovieListPage'
import AddToFavorites from '../components/cardIcons/addToFavorites'
import { getMoviesByCountry } from "../api/tmdb-api"
import { useParams } from "react-router";

// Based on favoriteMoviesPage.jsx
const CountryMoviesPage = (props) => {
    const [movies, setMovies] = useState([]);
    const { id, name } = useParams();

    useEffect(() => {
        getMoviesByCountry(id).then(movies => {
            setMovies(movies);
        });
    }, [id]);

    return (
        <MovieListTemplate
            title={`${name} Movies`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};
export default CountryMoviesPage;
