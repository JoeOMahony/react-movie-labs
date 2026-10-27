// Called by homePage.jsx, the queryFn in useQuery
export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

// Called in movieDetailsPage
// [ {..."id": 1423191...}, {...}]
export const getMovie = (args) => {
  console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

// filterMoviesCard useQuery() queryFn
export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    import.meta.env.VITE_TMDB_KEY +
    "&language=en-US"
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

// Called by templateMoviePage/index.jsx 
export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};


// For showing movie reviews feature / fetching movie reviews.
// Called by src/components/movieReviews/index.jsx
export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

// Exercise 02 Lab 02 
// Gets upcoming movies
export const getUpcomingMovies = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log('upcoming movies: ', json.results);
      return json.results;
    });
};

// Static Page 01 for assignment
// Gets top rated movies
// method logic below based on getUpcomingMovies
// https://developer.themoviedb.org/reference/movie-top-rated-list
export const getTopRatedMovies = (id) => {
  // ISO-3166-1 code
  const region = 'IE' // Ireland, might change this later, but will leave hard-coded here for now
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&region=${region}`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(region + ' top rated movies: ', json.results);
      return json.results;
    });
};

// Dynamic page to fetch movies for a genre
export const getMoviesByGenre = (genreId) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1&with_genres=${genreId}`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

// Dynamic page to fetch movies for a country
export const getMoviesByCountry = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1&with_origin_country=${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).then((json) => json.results)
    .catch((error) => {
      throw error
    });
};

export const getMoviesByCompany = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&page=1&with_companies=${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).then((json) => json.results)
    .catch((error) => {
      throw error
    });
};


// Gets the first 10 cast members for a given movie ID, used by movieDetails component
// based on getMovieReviews
// https://developer.themoviedb.org/reference/movie-credits
export const getCastByMovie = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).then((json) => json.cast) // also returns crew, but only have use for cast now, but maybe will use later
    .then((cast) => cast.slice(0, 10)) // only want first 10 to avoid cluttering
    .catch((error) => {
      throw error
    });
};

// Gets the movies for a given cast member ID, used in moviesByCastPage.jsx to show the movies for a cast member clicked in movieDetailsPage
// based on getMovieReviews
export const getMoviesByCast = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1&with_cast=${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).then((json) => json.results)
    .catch((error) => {
      throw error
    });
};
