# React Movies App
**Module:** Web App Development 2   
**Weight:** 40%      
**Due:** Sunday 08 November 23:59
## Submitter Details
**Name:** Joe O'Mahony    
**Student Number:** 21788075    
**Course:** B.Sc. in Software Systems Development    
**Term:** Year 4 Semester 1    

## Select Features
### `ErrorDisplay` Component
This component was only envisioned at the start of the final week, after I sought to improve the error message displayed on each page. I spent time writing a detailed error display in the now removed `directorMoviesPage` and realised that I would have to copy and adapt it to every single page. This was more than a handful of pages. Better late than never, I moved it into a new component to allow it to be adapted and reused as required. `ErrorDisplay` took two props, `resource` and `message`. `resource` was used to describe the actual resource associated with the error so that it could be displayed to the user in the error header: "There was an error when handling your {resource} request". The `message` is the actual error message, which I displayed in a HTML `code` block. I added in an error icon and some custom typography changes from my theme. Looking back, it took five commits (but a few hours) to make the changes:
1. Created the `ErrorDisplay` component, added new typography variants to the theme, and adapted `directorsMoviePage` to use the new component.
2. Made some small modifications to the wording of the `ErrorDisplay` header displayed to users.
3. Changed all pages to use the component.
4. Changed the three components to use it. I found all these and the pages by a global search for `isError` in VS Code.
5. Added error handling to `favoriteMoviesPage` and `watchListMoviesPage`. Before, these had no error handling (but did have a spinner for `isPending`).

---

### Moving to `personDetailsPage` from `moviesByCastPage` and `directorMoviesPage`
When I was adding more Chips to the `MovieDetails` component, I created a section showing the first ten actors associated with a movie in the same style as the others. This meant following the dynamic page pattern described below (query function, page based on`MovieListTemplate`, new route). A while later, I added a `directorMoviesPage` in this same pattern. A few days ago, however, I realised that to meet the assignment specification I would need some kind of actors page. I decided to implement this as a 'person' page because it would be illogical to have this functionality for the actor chips, but not the director chips on the same page. The following describes my process for extending the existing two page implementations into a single person page.

#### Taking Stock
While I'm not going to repeat the process I used to create the two dynamic pages, as it's outlined in great detail under the dynamic page pattern, I will describe what it left me with at the beginning of this overhaul. 
- Two pages under `pages/`: `moviesByCastPage` and `directorMoviesPage`.
- Four query functions in `tmdb-api`: `getMoviesByCast` and `getCastByMovie`, plus `getMoviesByDirector` and `getDirectorsByMovie`.
- Two routes in `main`: `/cast/:castId/:castName` and `/directors/:id/:name`
- Two `Paper` section displays with chips in `MovieDetails`.

#### High-Level Implementation
1. I added a new query function, `getPersonById`, to `tmdb-api`. This calls the `person` endpoint with a person's ID in the path and returns a JSON object containing that person's details.
2. I built a skeleton `personDetailsPage` page.
3. I added a new route for `/person/:id/:name`. The reason why `:name` is included in the path here is so that I can display it in the ErrorDisplay component. It's not ideal, it will be encoded leaving paths in the URL bar like `/person/525/Christopher%20Nolan`, and is even worse with accents, `/person/2838/Chlo%C3%AB%20Sevigny`.
4. I changed the actor and (later) director chips to link to this new page.
5. I filled out the details for the new page.
6. I added a `MovieList` section. I didn't use the `MovieListTemplate` because I didn't want a filter/sort card in a subsection. It looked off.
7. I incorporated directors into the page.
8. I deleted the old, now orphaned pages and their associated routes.

#### Problems Encountered
- Some people have both actor and director credits. This is especially common with directors, who earn an acting credit for cameos and short film appearances. I added a check to see whether that person was known for directing. If they were, the result from`getMoviesByDirector` was used.
- For directors, the query would also return their TV credits, so I filtered the results.
- I forgot to add in the Nav bar/header section at the top of the page body.
- I had to decide what to do with so many different things that could be pending or error. If the query function for the person endpoint succeeded, but the one for the `MovieList` part failed, should the entire page error? Should the page be allowed to load piecemeal or all at once? I decided that only the person query should decide the loading and error states.
- I would need to adapt the people page for the object properties actually returned. I don't want to have a line on their date of death if they're alive. I added a check. 


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
#### (2). Create the page under `src/pages/`
Dynamic pages can use `useParams` to allow parameters to be passed through the URL. I prefer writing the page before the `Route` entry as I'm never certain on what I'll need until writing the page, *e.g.*, if you only take an actor's or director's `id`, how will you put their name in the page header? The converse is also true, if you only take their `name`, how will you fetch from an endpoint requiring an `id`? The continuation of this example requires an `id`, which isn't necessarily an 'ID' in my project (although it mostly is). The dynamic parameter `id` goes into the `queryKey` so the query function can read it. Like static pages, the cache key is the queryKey, but for dynamic pages, this also incorporates the `{ id: id }`. The object key must be `id` because that's what `getDataById` destructures. Some pages also use a name parameter to customise the page title and `ErrorDisplay` message, *e.g.*, "Movies by Christopher Nolan", "Movies from Ireland", and "...an error when handling your Christopher Nolan movies request".
```jsx
// ...
const SomeDynamicMoviesPage = (props) => {
    const { id, name } = useParams();

    const result = useQuery({
        queryKey: ['someDynamicMovies', { id: id }],
        queryFn: getDataById,
    });
    const movies = result.data;
    const error = result.error;
    const isPending = result.isPending;
    const isError = result.isError;


    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <ErrorDisplay resource={`${name} movies`} message={error.message} /> // not the Error obj
    }

    return (
        <MovieListTemplate
            title={`Some dynamic movies by ${name}`}
            movies={movies}
            action={(movie) => {
                return <AddToFavorites movie={movie} />
            }}
        />
    );
};

export default SomeDynamicMoviesPage; 
```

#### (3). Add the route in `main.jsx`
The route declares the URL parameters read in the page created above. They must match the destructuring from the reading page exactly, *i.e.*, `{ paramName01, paramName02 } = useParams()` and be prefixed with `:`. For example, `/some-page/:paramName01/:paramName02`, `/directors/:id/:name`, and `/cast/:castId/:castName`.

```jsx 
import SomeDynamicMoviesPage from "./pages/someDynamicMoviesPage.jsx";
// ...
    <Routes>
        { /* ... */}
        <Route path="/some-dynamic-movies/:id/:name" element={<SomeDynamicMoviesPage />} />
    </Routes>
// ...
```