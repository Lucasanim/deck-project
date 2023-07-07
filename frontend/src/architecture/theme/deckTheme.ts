import { createTheme } from "@mui/material";

const deckTheme = (darkMode: boolean) => createTheme({
    palette: {
       mode: darkMode ? "dark" : "light",
    },
 });

export {deckTheme}
