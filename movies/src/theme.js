import { createTheme } from "@mui/material/styles";

// Built using Peter Liu's MUI Theme Builder: https://petertyliu.github.io/mui-theme-builder/
// Recommended by MUI documentation: https://mui.com/material-ui/customization/theming/
const themeOptions = {
  "palette": {
    "primary": {
      "main": "#890303"
    },
    "secondary": {
        "main": "#000a74"
    },
    "background": {
      "paper": "#F8FAFC"
    }
  }
}

const myTheme = createTheme(themeOptions);

export default myTheme;