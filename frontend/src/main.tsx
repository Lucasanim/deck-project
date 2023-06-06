import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import RootRouter from "./router/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
