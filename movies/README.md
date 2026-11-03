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