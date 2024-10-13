import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import { AntColorsProvider } from "app/providers/AntColorsProvider";
import { StoreProvider } from "app/providers/StoreProvider";

import { App } from "./app/App.tsx";

import "app/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <AntColorsProvider>
        <App />
      </AntColorsProvider>
    </StoreProvider>
  </BrowserRouter>
);
