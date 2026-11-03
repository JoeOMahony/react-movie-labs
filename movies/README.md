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
Static pages do not need a queryKey to pass to the URL as a parameter, so they all follow a basic structure shown below.

```jsx
// based on getNowPlayingMovies.jsx
export const getDataFromEndpoint = () => {
  return fetch(
    `https://api.themoviedb.org/3/[ENDPOINT]/?api_key=${import.meta.env.VITE_TMDB_KEY}[...params]`
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
```
