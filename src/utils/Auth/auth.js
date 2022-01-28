import * as React from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";


const authProvider = {
  isAuthenticated: false,
  signin(callback) {
    authProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const AuthContextType = {
  user: null,
  signin: () => {},
  signout: () => {},
}

let passWordRegex =  {
  lowerCase: new RegExp('[a-z]', 'i'),
  upperCase: new RegExp('[A-Z]', 'i'),
  numbers: new RegExp(/[0-9]/, 'i'),
  // specialChar: new RegExp(/[(),.@/*{}]/, 'i'),
};

const passWordRegexTest = (password) => {
  return Object.values(passWordRegex).every( regex =>  {
    return regex.test(password); 
  })
}

// let passWordRegex =  new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)” + “(?=.*[-+_!@#$%^&*., ?]).+$', 'i');

let AuthContext = React.createContext(AuthContextType);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return authProvider.signin(() => {
      const isPasswordValid = passWordRegexTest(newUser.password);
      if(newUser.password !== '' && isPasswordValid) {
        setUser(newUser);
        callback();
      }
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}


function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export {
  passWordRegexTest,
  AuthProvider,
  RequireAuth,
  useAuth,
}