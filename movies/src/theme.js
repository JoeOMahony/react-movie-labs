import { createTheme } from "@mui/material/styles";



// Built using Peter Liu's MUI Theme Builder: https://petertyliu.github.io/mui-theme-builder/
// Recommended by MUI documentation: https://mui.com/material-ui/customization/theming/
const themeOptions = {
  "palette": {
    "primary": {
      "main": "#890303",
      "dark": "#660202"
    },
    "secondary": {
        "main": "#000a74"
    },
    "tertiary": {
      "main": "#fbd88c",
      "dark":  "#8c6104"
    },
    "background": {
      "paper": "#F8FAFC"
    },
    "golden": {
      "main": "#EBAB47"  // Oscar gold
    },
    "money": {
      "main": "#3C9D2F"
    }
  },
  typography: {
    movieTitleFont: {
      fontFamily: ' "Garamond", "Palatino", serif ',
      fontWeight: 550,
      letterSpacing: 0.4,
    },
    movieTaglineFont: {
      fontFamily: '"Palatino", "Times New Roman", serif ',
      fontWeight: 400,
      letterSpacing: 0.2,
      fontStyle: 'italic'
    },
    pageHeadingFont: {
      fontWeight: 500,
      letterSpacing: 0.2,
      color: "#660202",
      fontStyle: 'italic'
    },
    pageErrorHeadFont: {
      fontWeight: 550,
      color: "#ca0000",
      textDecoration: 'underline'
    },
    pageErrorBodyFont: {
      fontWeight: 500,
      color: "#000000"
    },
    pageErrorCodeFont: {
      fontWeight: 400,
      color: "#000000"
    },
    errorIconFont: { // adding it here to avoid needing to change all the pages that use it again
      fontSize: 60, 
      color: "#ca0000"
    }
  }
}


const myTheme = createTheme(themeOptions);

export default myTheme;