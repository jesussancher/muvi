import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  FavoritesPage,
  DetailsPage,
  TVSeriesPage,
  TVDetailsPage,
} from "./pages";
import ErrorBoundary from "./error/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
        <Route path="/tv" element={<TVSeriesPage />} />
        <Route path="/tv/:id" element={<TVDetailsPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
