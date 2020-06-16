import React from "react";
import { MovieState } from "./Context/MovieContext";
import Hero from "./components/Hero/Hero";
import "./App.css";

const App = () => {
  return (
    <MovieState>
      <Hero />
    </MovieState>
  );
};

export default App;
