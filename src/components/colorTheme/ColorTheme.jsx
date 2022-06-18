import { createTheme } from "@mui/material/styles";
import { purple } from '@mui/material/colors';

export const colorTheme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: "#d81b60",
      },
      blue: "#1e88e5",
      green: "#2e7d32",
    },
});
