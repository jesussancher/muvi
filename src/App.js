import React from 'react';
import './App.css';
import {
  Route, 
  Routes } from 'react-router-dom';
import { 
  HomePage,
  LoginPage,
  FavoritesPage,
  DetailsPage
} from './pages';
import { 
  AuthProvider, 
  RequireAuth 
} from './utils/Auth/auth.js';
import ErrorBoundary from './error/ErrorBoundary';
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <HomePage />
                    </RequireAuth>
                  }
                  >
              </Route>
              <Route
                  path="/favorites"
                  element={
                    <RequireAuth>
                      <FavoritesPage />
                    </RequireAuth>
                  }
                  >
              </Route>
              <Route
                  path="/movie/:id"
                  element={
                    <RequireAuth>
                      <DetailsPage />
                    </RequireAuth>
                  }
                  >
              </Route>
            </Routes>
       </AuthProvider>
     </ErrorBoundary> 
  );
}

export default App;
