import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0e0e0e",
      paper: "#1b1b1b",
    },
    primary: { main: "#00bcd4" },
    secondary: { main: "#ef5350" },
  },
});

export default theme;
