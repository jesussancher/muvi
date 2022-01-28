import './App.css';
import { 
  Route, 
  Routes } from 'react-router-dom';
import { 
  HomePage,
  LoginPage
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
          {/* <div className="App" onContextMenu={e => e.preventDefault()}> */}
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
            </Routes>
          {/* </div> */}
       </AuthProvider>
     </ErrorBoundary> 
  );
}

export default App;
