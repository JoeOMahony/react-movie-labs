import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  /*
  The App component composes (i.e. fills) the MoviesContextProvider with the rest of our components. 
  All components can potentially access the values in the context, subject to a small code addition.
  For example, the Home page and Favourites page will be able to access the favourites list.

  */
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [myWatchList, setMyWatchList] = useState([]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  const addToWatchList = (movie) => {
    let newWatchList = [];
    if (!myWatchList.includes(movie.id)) {
      newWatchList = [...myWatchList, movie.id];
    }
    else {
      newWatchList = [...myWatchList];
    }
    setMyWatchList(newWatchList)
  };

  const removeFromWatchList = (movie) => {
    setMyWatchList(myWatchList.filter(
      (mId) => mId !== movie.id
    ))
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };
  console.log(myReviews);
  console.log(myWatchList);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        myReviews, 
        addReview,
        myWatchList,
        addToWatchList,
        removeFromWatchList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
