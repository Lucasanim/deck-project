import { createTheme } from "@mui/material";
import { store } from "../../redux/store/Store";

const deckTheme = (darkMode: boolean) => createTheme({
    palette: {
       mode: darkMode ? "dark" : "light",
    },
 });

export {deckTheme}
