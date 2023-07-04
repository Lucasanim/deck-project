import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import RootRouter from "./router/Router";
import { ThemeProvider } from "@emotion/react";
import { deckTheme } from "./architecture/theme/deckTheme";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { StoreData } from "./redux/store/Store";

const App: React.FC = () => {
  const darkMode = useSelector(
    (store: StoreData) => store.session.sessionData.darkMode
  );
  return (
    <ThemeProvider theme={deckTheme(darkMode)}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
