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
    }
  }
}


const myTheme = createTheme(themeOptions);

export default myTheme;