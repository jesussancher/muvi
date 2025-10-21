import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage, FavoritesPage, DetailsPage } from "./pages";
import ErrorBoundary from "./error/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
