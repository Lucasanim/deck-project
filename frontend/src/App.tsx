import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import RootRouter from "./router/Router";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
