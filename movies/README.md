# React Movies App
**Module:** Web App Development 2   
**Weight:** 40%      
**Due:** Sunday 08 November 23:59
## Submitter Details
**Name:** Joe O'Mahony    
**Student Number:** 21788075    
**Course:** B.Sc. in Software Systems Development    
**Term:** Year 4 Semester 1    
## Project Patterns
### Static Page Pattern
This pattern describes how static pages were added to the website. Examples of static pages include the Now Playing (`nowPlayingMoviesPage`), Trending (`trendingMoviesPage`), Top Rated (`topRatedMoviesPage`), and Upcoming (`upcomingMoviesPage`) pages, as available in the site header.
#### (1). Add the query function to `tmdb-api`
Static pages do not use a queryKey to pass parameters to the URL, so they all follow a basic structure shown below. The `[ENDPOINT]` indicates where the endpoint path should be filled in, such as `movie/now_playing` or `trending/movie/[day/week]`. The `3` indicates the TMDB API version, and `?` the start of the URL query parameters (`key=value`). For *most* endpoints, the only required parameter is `api_key` and default values may be used for others, such as `page=1`. Some of the static endpoints use a region to filter results by passing `region=IE`. Promises are used for error handling using the pattern shown below (from a lab), but some (dynamic) query functions require the modification of the API response before the final return, *e.g.*, slicing a returned array or filtering by a specific key within a JSON response. While the static pages don't modify `json.results` before returning, I kept the pattern for extensibility.
```jsx
// A general template for fetching data without any dynamic query key 
// based on getNowPlayingMovies from tmdb-api
export const getDataFromEndpoint = () => {
  return fetch(
    `https://api.themoviedb.org/3/[ENDPOINT]?api_key=${import.meta.env.VITE_TMDB_KEY}[...params]`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).then((json) => json.results[.transformHowever])
    .catch((error) => {
      throw error
    });
};
```

#### (2). Create the page under `src/pages/`
The template below shows the pattern for static pages. While the query key is not used to pass URL parameters, it's still needed for caching. The `queryFn` is what's called in `tmdb-api`, in this case the `getDatafromEndpoint` function above. A custom `ErrorDisplay` component is used to avoid having to rewrite and reupdate code across all relevant pages and components for error displays. This component is described in more detail elsewhere.  The action icon can be either `AddToFavorites` or `AddToWatchList` from `src/components/cardIcons`
```jsx
// import statements not shown

// Based on nowPlayingMoviesPage.jsx
const SomeMoviesPage = () => {
    // destructuring can be used here, but I favour not to
    const result = useQuery({
        queryKey: ['someMovies'],
        queryFn: getDataFromEndpoint,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        // Error header renders as "There was an error when handling your [some movies] request!"
        return <ErrorDisplay resource={`some movies`} message={error.message} /> 
    }

    return (
        <MovieListTemplate
            title={`Some Movies`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};

export default SomeMoviesPage;
```

#### (3). Add the route in `main.jsx`
Without a route in the browser router the page is inaccessible. Any unspecified paths are caught by `<Route path="*" element={<Navigate to="/" />} />`.
```jsx
import SomeMoviesPage from "./pages/someMoviesPage.jsx";
// ...
    <Routes>
        { /* ... */}
        <Route path="/some-movies" element={<SomeMoviesPage />} />
    </Routes>
// ...
```

#### (4). Add the link to the site header
The page is now accessible by `/some-movies`, but there isn't any way to know that. To add the page to the site header, a label must be added to the file under `components/siteHeader`.
```jsx
// ...
    const menuOptions = [
        // ...
        { label: "Some Movies", path: "/some-movies" }
    ];
// ...
```

---

### Dynamic Page Pattern
This pattern describes how dynamic pages were added to the project. Dynamic pages are pages that show results based on the URL parameters. For example, `directorMoviesPage` is going to show different movies based on the director's id. Examples of dynamic pages include Country (`countryMoviesPage`), Company (`companyMoviesPage`), Cast (`moviesByCastPage`) and Director (`directorMoviesPage`) pages, among others. Unlike static pages, all of the above pages are not reached by using the site header. They are reached through the `movieDetails` component's chips.

#### (1). Add the query function to `tmdb-api`
Dynamic pages use the queryKey passed in order to extract data to use in the URL path or append as parameters. Multiple parameters can be passed in the query key, but haven't been in this project. The key diffences from static pages are the extraction of the `idPart`, which just represents the second/last entry of the array in my case, and the destructuring of id from that. Promises are used for error handling and some query functions require the modification of the API response before the final return. For example, slicing an array of actors in `getCastByMovie`, and filtering `crew` by a specific `member.job` key's `Director` value within both `getMoviesByDirector` and `getDirectorsByMovie` JSON responses.

```jsx
// General template for fetching TMDB API data using a dynamic query parameter [key]=${id}
export const getDataById = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/[ENDPOINT]?api_key=${import.meta.env.VITE_TMDB_KEY}&[key]=${id}[...params]`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).then((json) => json.results[.transformHowever])
    .catch((error) => {
      throw error
    });
};
```
