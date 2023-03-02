import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PokemonProvider } from "./context/pokemon.context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);
