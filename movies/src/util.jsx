import truncate from "lodash/truncate";

// we are using a utility function to truncate a review’s text. For this, we will use a package called lodash
export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

// I wrote this as I believed I would need it in an API call, but didn't end up using it. I do think I will need it in the future though, so I'll put it here for now.
export const getTodayDay = () => new Date().getDate(); // getDate() returns the actual DD, getDay gives you the day of the week in number (Wed = 3)
export const getTodayMonth = () => new Date().getMonth();
export const getTodayYear = () => new Date().getFullYear();