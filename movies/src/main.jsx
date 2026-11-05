import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { ThemeProvider } from "@emotion/react";
import myTheme from "./theme.js"
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import WatchListMoviesPage from "./pages/watchListMoviesPage";
import GenreMoviesPage from "./pages/genreMoviesPage";
import CountryMoviesPage from "./pages/countryMoviesPage";
import CompanyMoviesPage from "./pages/companyMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage.jsx";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage.jsx";
import PersonDetailsPage from "./pages/personDetailsPage.jsx";

// will manage the cache in the browser
const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR_IN_MS,
      refetchInterval: ONE_HOUR_IN_MS,
      refetchOnWindowFocus: false
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/top-rated" element={<TopRatedMoviesPage />} />
            <Route path="/watchlist" element={<WatchListMoviesPage />} />
            <Route path="/genres/:id/:name" element={<GenreMoviesPage />} />
            <Route path="/countries/:id/:name" element={<CountryMoviesPage />} />
            <Route path="/companies/:id/:name" element={<CompanyMoviesPage />} />
            <Route path="/trending" element={<TrendingMoviesPage />} />
            <Route path="/now-playing" element={<NowPlayingMoviesPage />} />
            <Route path="/person/:id/:name" element={<PersonDetailsPage /> } />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<ThemeProvider theme={ myTheme }> <App /> </ThemeProvider>);
